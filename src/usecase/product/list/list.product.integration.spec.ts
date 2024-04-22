import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import ListProductUseCase from "./list.product.usecase";

describe("Test listing product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should listing a product", async () => {
    const product = ProductFactory.create(
      "a",
      "Caneta Prata",
      12
    );

    const product2 = ProductFactory.create(
      "a",
      "Caneta Azul",
      12
    );
    
    const productRepository = new ProductRepository();
    const createUsecase = new CreateProductUseCase(productRepository);
    const findUsecase = new ListProductUseCase(productRepository);

    const output = await createUsecase.execute(product);    
    const output2 = await createUsecase.execute(product2);    

    const result = await findUsecase.execute({});

    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe(output.id);
    expect(result.products[0].name).toBe(output.name);
    expect(result.products[0].price).toBe(output.price);
    expect(result.products[1].id).toBe(output2.id);
    expect(result.products[1].name).toBe(output2.name);
    expect(result.products[1].price).toBe(output2.price);
  });
});