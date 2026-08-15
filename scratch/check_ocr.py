import sys

def check_ocr():
    try:
        import pytesseract
        from PIL import Image
        print("pytesseract is installed!")
        text = pytesseract.image_to_string(Image.open('c:/Users/dell/Downloads/marudeni/public/marudeni-flyer.jpeg'))
        print("Extracted text (Tesseract):")
        print(text)
        with open('c:/Users/dell/Downloads/marudeni/scratch/ocr-tesseract.txt', 'w') as out:
            out.write(text)
    except ImportError:
        print("pytesseract is not installed.")

    try:
        import easyocr
        print("easyocr is installed!")
        reader = easyocr.Reader(['en'])
        result = reader.readtext('c:/Users/dell/Downloads/marudeni/public/marudeni-flyer.jpeg')
        print("Extracted text (EasyOCR):")
        text = "\n".join([line[1] for line in result])
        print(text)
        with open('c:/Users/dell/Downloads/marudeni/scratch/ocr-easyocr.txt', 'w') as out:
            out.write(text)
    except ImportError:
        print("easyocr is not installed.")

if __name__ == '__main__':
    check_ocr()
