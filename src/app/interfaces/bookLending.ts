export interface BookLending {
  id: string;
  loan_date: string;
  return_date: string;
  return_status: string;
  book_condition: string;
  book_id: string;
  user_id: string;
  extensions: string;
  fees: string;
  notes: string;
}
