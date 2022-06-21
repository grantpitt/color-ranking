import json

with open("books.json", "r") as f:
    booksData = json.load(f)

bookIds = [book["id"] for book in booksData["data"]["getBooks"]]

raw = []
for bookId in bookIds:
    with open(f"{bookId}.json", "r") as f:
        bookData = json.load(f)
    data = None
    if "data" in bookData:
        data = bookData["data"]["getBook"]
    elif "getBook" in bookData:
        data = bookData["getBook"]
    else:
        if "id" not in bookData:
            raise Exception("The book is not in the correct format")
        data = bookData
    colors = data["colors"]
    raw.extend(colors)

with open("raw.json", "w") as f:
    json.dump(raw, f)
