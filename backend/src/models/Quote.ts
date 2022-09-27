import { Column, HasOne, Model, Table } from "sequelize-typescript";
import Journal from "./Journal";

@Table
class Quote extends Model {
  @Column
  content: string;

  @HasOne(() => Journal, { onDelete: "CASCADE" })
  journal: Journal;
}

export default Quote;
