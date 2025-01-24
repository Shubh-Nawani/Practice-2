const Book = require('../models/bookModel');

const createBooks = async (req, res) => {
    try {
        const {title, author, genre, available, year} = req.body;
        // if (!title || !author || !genre || !available || !year) {
        //     return res.status(400).json({msg: "Please enter all fields"});
        // }
        // if (Book.findOne({title})) {
        //     return res.status(400).json({msg: "Book already exists"});
        // }
        const newBook = new Book({
            title,
            author,
            genre,
            available,
            year
        });

        await newBook.save();
        res.json(newBook);

    } catch (err) {
        console.error(err.message);
    }

}

const updateBooks = async (req, res) => {
    try {
      const books = await Book.findByIdAndUpdate(req.body.id, req.body);

      res.status(200).json({msg: "Book updated", data: books});

    } catch (err) {
        console.error(err.message);
    }

}

const deleteBooks = async (req, res) => {
    try {
        const {title} = req.body;
        if (!title) {
            return res.status(400).json({msg: "Please enter title"});
        }
        const book = await Book.findByIdAndDelete({title});
        if (!book) {
            return res.status(400).json({msg: "Book does not exist"});
        }
        res.json(book);
    } catch (err) {
        console.error(err);
    }}

const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {createBooks, updateBooks, deleteBooks, getBooks};

