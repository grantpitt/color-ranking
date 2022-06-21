import json

with open("raw.json", "r") as f:
    raw = json.load(f)

filtered = []
for color in raw:
    color = {
        "code": color["code"],
        "name": color["name"] if "name" in color else None,
        "rgb": [color["rgb"]["r"], color["rgb"]["g"], color["rgb"]["b"]],
        "hex": color["hex"],
        "lab": [color["lab"]["l"], color["lab"]["a"], color["lab"]["b"]],
        "cmky": [color["cmky"]["c"], color["cmky"]["m"], color["cmky"]["k"], color["cmky"]["y"]] if "cmky" in color and color["cmky"] is not None else None,
        "book": color["book"]["title"]
    }
    filtered.append(color)

with open("filtered.json", "w") as f:
    json.dump(filtered, f)
