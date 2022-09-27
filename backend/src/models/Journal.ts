import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
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
  description: string;

  @ForeignKey(() => Quote)
  @Column
  quoteId: number;

  @BelongsTo(() => Quote, { onDelete: "CASCADE" })
  quote: Quote;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}

export default Journal;
