import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
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

  it("should update a product", async () => {
    const product = ProductFactory.create(
      "a",
      "Caneta Prata",
      12
    );
    
    const productRepository = new ProductRepository();
    const createUsecase = new CreateProductUseCase(productRepository);
    const updateUsecase = new UpdateProductUseCase(productRepository);

    const output = await createUsecase.execute(product);    
    const input = {
      id: output.id,
      name: "Caneta Prata Updated",
      price: 13
    };
    const result = await updateUsecase.execute(input);

    expect(result).toEqual(input);
  });
});