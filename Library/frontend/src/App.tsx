import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { Book, BooksTableProps } from "./components/book";
import Login from "./components/Login";
import Register from "./components/Register";
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

function App() {
  const [books, setBooks] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    Cookies.get("userId") !== undefined
  );
  React.useEffect(() => {
    async function fetchBooks() {
      const response = await fetch("http://localhost:4000/api/v1/books");
      const books = await response.json();
      setBooks(books);
    }

    fetchBooks();
  }, []);
  const handleBorrow = async (bookId: number) => {
    // TODO: Implement borrowing logic
    console.log(`Borrowing book with ID ${bookId}`);
    const userId = Cookies.get("userId");
    try {
      const response1 = await axios.get(
        `http://localhost:4000/api/v1/users/${userId}`
      );
      // const userBooks = response1.data.books;
      const userBooks = response1.data.users_borrow;
      if (userBooks.length >= 3) {
        alert(
          `You cannot borrow more than 3 books. You have already borrowed ${userBooks.length} books.`
        );
        return;
      }
      const response = await axios.patch(
        `http://localhost:4000/api/v1/users/${userId}`,
        {
          books: [bookId],
        }
      );
      alert(`Book "${bookId}" borrowed successfully!`);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(`Failed to borrow book "${bookId}".`);
    }
  };
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <Book
                books={books}
                isLoggedIn={isLoggedIn}
                handleBorrow={handleBorrow}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
