import base64
from PIL import Image, ImageDraw

# Create a simple image
img = Image.new('RGB', (100, 50), color = (221, 221, 221)) # Light grey background
d = ImageDraw.Draw(img)
d.text((10,10), "Logo", fill=(51,51,51)) # Dark grey text

# Save to a bytes buffer
import io
img_byte_arr = io.BytesIO()
img.save(img_byte_arr, format='PNG')
img_byte_arr = img_byte_arr.getvalue()

# Encode to base64 and print
print(base64.b64encode(img_byte_arr).decode('utf-8'))
