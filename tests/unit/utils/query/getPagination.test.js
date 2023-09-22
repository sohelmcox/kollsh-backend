const { getPagination } = require("../../../../src/utils/Query/getPagination");

describe("getPagination", () => {
  it("should calculate pagination correctly when pageNumber is in the middle", () => {
    // Arrange
    const totalCount = 100;
    const pageSize = 10;
    const pageNumber = 5;

    // Act
    const pagination = getPagination({ totalCount, pageSize, pageNumber });

    // Assert
    expect(pagination).toEqual({
      pageNumber: 5,
      pageSize: 10,
      totalCount: 100,
      totalPage: 10,
      next: 6,
      prev: 4,
    });
  });

  it("should calculate pagination correctly when pageNumber is 1", () => {
    // Arrange
    const totalCount = 100;
    const pageSize = 10;
    const pageNumber = 1;

    // Act
    const pagination = getPagination({ totalCount, pageSize, pageNumber });

    // Assert
    expect(pagination).toEqual({
      pageNumber: 1,
      pageSize: 10,
      totalCount: 100,
      totalPage: 10,
      next: 2,
    });
  });

  it("should calculate pagination correctly when pageNumber is the last page", () => {
    // Arrange
    const totalCount = 100;
    const pageSize = 10;
    const pageNumber = 10;

    // Act
    const pagination = getPagination({ totalCount, pageSize, pageNumber });

    // Assert
    expect(pagination).toEqual({
      pageNumber: 10,
      pageSize: 10,
      totalCount: 100,
      totalPage: 10,
      prev: 9,
    });
  });

  it("should calculate pagination correctly when there is only one page", () => {
    // Arrange
    const totalCount = 5;
    const pageSize = 10;
    const pageNumber = 1;

    // Act
    const pagination = getPagination({ totalCount, pageSize, pageNumber });

    // Assert
    expect(pagination).toEqual({
      pageNumber: 1,
      pageSize: 10,
      totalCount: 5,
      totalPage: 1,
    });
  });
});
