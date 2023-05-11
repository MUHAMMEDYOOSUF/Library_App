import React, { useState, useEffect } from "react";

import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
} from "@material-ui/core";
import { BookTableRow, BookTableRowProps } from "./row";
import axios from "axios";
import Cookies from "js-cookie";
import useStyles from "./style";
import "./Register.css";

export interface Book {
  id: number;
  author: string;
  book_name: string;
  copies: number;
  is_active: boolean;
  is_available: boolean;
  is_delete: boolean;
}

export interface BooksTableProps {
  books: Book[];
  isLoggedIn: boolean;
  handleBorrow: (bookId: number) => Promise<void>;
}

export function Book({ books, isLoggedIn, handleBorrow }: BooksTableProps) {
  const [user, setUser] = useState(null);
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      axios
        .get(`http://localhost:4000/api/v1/users/${userId}`)
        .then((response) => {
          setUser(response.data);

          const currentDate = new Date();
          response.data.users_borrow.forEach((borrow: any) => {
            const dueDate = new Date(borrow.due_date);
            if (currentDate > dueDate) {
              const daysOverdue = Math.floor(
                (currentDate.getTime() - dueDate.getTime()) / (1000 * 3600 * 24)
              );
              const fineAmount = daysOverdue * 2;
              alert(
                `Due date is over for ${borrow.book_name}. You have to pay a fine of ${fineAmount} dollars.`
              );
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleSearch = (event: any) => {
    event.preventDefault();
    axios
      .get(`http://localhost:4000/api/v1/search?search_value=${searchValue}`)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleLogout = () => {
    Cookies.remove("userId");
    window.location.href = "/";
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <TextField
          id="search"
          label="Search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <button type="submit" className="form-button">
          Search
        </button>
      </form>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {isLoggedIn ? (
                <>
                  <TableCell className={classes.tableCell} colSpan={3}>
                    Books
                  </TableCell>
                  <TableCell className={classes.tableCell} colSpan={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleLogout}
                      className={classes.button}
                    >
                      Logout
                    </Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell className={classes.tableCell} colSpan={5}>
                    Books
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Button
                      variant="contained"
                      color="primary"
                      href="/login"
                      className={classes.button}
                    >
                      Login
                    </Button>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Button
                      variant="contained"
                      color="primary"
                      href="/register"
                      className={classes.button}
                    >
                      Register
                    </Button>
                  </TableCell>
                </>
              )}
            </TableRow>
            ...
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>Sl No:</TableCell>
              <TableCell className={classes.tableCell}>Book Name</TableCell>
              <TableCell className={classes.tableCell}>Author</TableCell>
              {isLoggedIn && (
                <TableCell className={classes.tableCell}>Copies</TableCell>
              )}
              {/* <TableCell className={classes.tableCell}>Availability</TableCell> */}
              {isLoggedIn && (
                <TableCell className={classes.tableCell}>Borrow</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {searchValue
              ? searchResults.map((book: any, index) => (
                  <BookTableRow
                    key={book.id}
                    book={book}
                    isLoggedIn={isLoggedIn}
                    handleBorrow={handleBorrow}
                    user={user}
                    classes={classes}
                    serialNumber={index + 1}
                  />
                ))
              : books.map((book, index) => (
                  <BookTableRow
                    key={book.id}
                    book={book}
                    isLoggedIn={isLoggedIn}
                    handleBorrow={handleBorrow}
                    user={user}
                    classes={classes}
                    serialNumber={index + 1}
                  />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Book;
