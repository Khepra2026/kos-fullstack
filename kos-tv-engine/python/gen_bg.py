
from PIL import Image, ImageDraw, ImageFont
img = Image.new("RGB", (1080, 1920), color="#050507")
draw = ImageDraw.Draw(img)
draw.text((50, 800), """3 erreurs qui coutent 2M$""", fill="#10b981", font_size=80)
draw.text((50, 1000), "KOS RegTech - Big Four 100/100", fill="white", font_size=40)
draw.text((50, 1800), "BC47B669 - app.khepraexperts.com/pitch", fill="#666", font_size=24)
img.save("templates/bg.png")
print("BG created")
