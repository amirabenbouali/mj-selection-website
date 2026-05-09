import AppKit
import Foundation
import PDFKit
import Vision

let args = CommandLine.arguments
guard args.count >= 2 else {
  fputs("Usage: swift extract_brochure_ocr.swift brochure.pdf [output.txt]\n", stderr)
  exit(1)
}

let pdfURL = URL(fileURLWithPath: args[1])
let outputURL = args.count >= 3 ? URL(fileURLWithPath: args[2]) : nil

guard let document = PDFDocument(url: pdfURL) else {
  fputs("Could not open PDF: \(pdfURL.path)\n", stderr)
  exit(2)
}

func render(page: PDFPage, scale: CGFloat = 2.4) -> CGImage? {
  let pageBounds = page.bounds(for: .mediaBox)
  let width = Int(pageBounds.width * scale)
  let height = Int(pageBounds.height * scale)

  guard let context = CGContext(
    data: nil,
    width: width,
    height: height,
    bitsPerComponent: 8,
    bytesPerRow: 0,
    space: CGColorSpaceCreateDeviceRGB(),
    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
  ) else {
    return nil
  }

  context.setFillColor(NSColor.white.cgColor)
  context.fill(CGRect(x: 0, y: 0, width: width, height: height))
  context.saveGState()
  context.scaleBy(x: scale, y: scale)
  page.draw(with: .mediaBox, to: context)
  context.restoreGState()

  return context.makeImage()
}

func recognize(image: CGImage) throws -> [String] {
  let request = VNRecognizeTextRequest()
  request.recognitionLevel = .accurate
  request.usesLanguageCorrection = true
  request.recognitionLanguages = ["it-IT", "fr-FR", "en-US"]
  request.minimumTextHeight = 0.008

  let handler = VNImageRequestHandler(cgImage: image, options: [:])
  try handler.perform([request])

  return (request.results ?? [])
    .compactMap { $0.topCandidates(1).first?.string }
}

var output = ""

for index in 0..<document.pageCount {
  autoreleasepool {
    guard let page = document.page(at: index), let image = render(page: page) else {
      output += "\n\n--- PAGE \(index + 1) ---\n[Could not render page]\n"
      return
    }

    do {
      let lines = try recognize(image: image)
      output += "\n\n--- PAGE \(index + 1) ---\n"
      output += lines.joined(separator: "\n")
      output += "\n"
    } catch {
      output += "\n\n--- PAGE \(index + 1) ---\n[OCR error: \(error)]\n"
    }
  }
}

if let outputURL {
  try output.write(to: outputURL, atomically: true, encoding: .utf8)
} else {
  print(output)
}
