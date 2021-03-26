const INDEXED_VALUE = { 0: "pedido", 1: "nf", 2: "entrega", 3: "status" };

export class BraspressOrder {
  public pedido!: string;
  public nf!: string;
  public entrega!: string;
  public status!: string;

  public static fromList(list: string[]): BraspressOrder {
    return list.reduce((acc, current, index) => {
      acc[INDEXED_VALUE[index]] = current;
      return acc;
    }, new BraspressOrder());
  }
}
