import axios from "axios";
import { Button, TableCell, TableRow } from "@material-ui/core";
import { Book } from "./book";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";

export interface BookTableRowProps {
  book: Book;
  isLoggedIn: boolean;
  handleBorrow: (bookId: number) => Promise<void>;
  user: any;
  classes: any;
  serialNumber: any;
}

export function BookTableRow({
  book,
  isLoggedIn,
  handleBorrow,
  user,
  classes,
  serialNumber,
}: BookTableRowProps) {
  const [isBorrowed, setIsBorrowed] = useState(false);

  useEffect(() => {
    // if (user && user.books && user.books.some((b: any) => b.id === book.id)) {
    if (
      user &&
      user.users_borrow &&
      user.users_borrow.some((b: any) => b.books_id === book.id)
    ) {
      setIsBorrowed(true);
    }
  }, [book.id, user]);

  const borrowBook = async () => {
    // Get the user ID from the cookie
    const userId = Cookies.get("userId");
    if (!userId) {
      alert("Please log in to borrow books.");
      return;
    }
    // Send a GET request to fetch the user's borrowed books
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/users/${userId}`
      );
      const userBooks = response.data.books;
      if (userBooks.length >= 3) {
        alert(
          `You cannot borrow more than 3 books. You have already borrowed ${userBooks.length} books.`
        );
        return;
      }
      // Send a PATCH request to update the user's borrowed books
      const response2 = await axios.patch(
        `http://localhost:4000/api/v1/users/${userId}`,
        {
          books: [...userBooks, book.id],
        }
      );
      alert(`Book "${book.book_name}" borrowed successfully!`);
      setIsBorrowed(true);
    } catch (error) {
      console.error(error);
      alert(`Failed to borrow book "${book.book_name}".`);
    }
  };

  return (
    <TableRow className={classes.tableRow}>
      <TableCell className={classes.tableLine}>{serialNumber}</TableCell>
      <TableCell className={classes.tableLine}>{book.book_name}</TableCell>
      <TableCell className={classes.tableLine}>{book.author}</TableCell>
      {isLoggedIn && (
        <TableCell className={classes.tableLine}>{book.copies}</TableCell>
      )}
      {/* <TableCell className={classes.tableLine}>{book.is_available ? "Available" : "Unavailable"}</TableCell> */}
      {isLoggedIn && (
        <TableCell className={classes.tableLine}>
          {isBorrowed ? (
            <Button
              variant="contained"
              className={`${classes.button} ${classes.borrowedButton}`}
              disabled
            >
              Borrowed
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => handleBorrow(book.id)}
              disabled={!book.is_available}
            >
              {book.is_available ? "Borrow" : "Unavailable"}
            </Button>
          )}
        </TableCell>
      )}
    </TableRow>
  );
}
