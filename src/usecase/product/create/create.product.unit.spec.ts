import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "Caneta 4 cores",
    price: 10.20
};

const MockRepository = () => {
return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    };
};

describe("Unit tes create product use case", () => {
    it("should create product", async() => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    });
});

