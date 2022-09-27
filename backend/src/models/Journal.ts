import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import Quote from "./Quote";

@Table
class Journal extends Model {
  @AllowNull(false)
  @Column
  title: string;

  @Column
  content: string;

  @ForeignKey(() => Quote)
  @Column
  quoteId: number;

  @BelongsTo(() => Quote, { onDelete: "CASCADE" })
  quote: Quote;

  @CreatedAt
  creationAt: Date;

  @UpdatedAt
  updatedOn: Date;
}

export default Journal;
