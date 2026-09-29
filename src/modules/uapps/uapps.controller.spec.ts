import {
  UAppsController,
} from "./uapps.controller";

describe(
  "UAppsController",
  () => {
    let controller: UAppsController;

    const service: any = {
      list:
        jest.fn(),
      listMine:
        jest.fn(),
      findById:
        jest.fn(),
      create:
        jest.fn(),
      update:
        jest.fn(),
    };

    beforeEach(() => {
      jest.clearAllMocks();

      controller =
        new UAppsController(
          service,
        );
    });

    it(
      "should list UApps with query filters",
      async () => {
        const query: any = {
          page: 2,
          limit: 10,
          search: "gold",
          platform: "web",
          featured: true,
        };

        service.list =
          jest
            .fn()
            .mockResolvedValue({
              items: [],
              meta: {
                page: 2,
                limit: 10,
                total: 0,
                totalPages: 0,
              },
            });

        const result =
          await controller.list(
            query,
          );

        expect(
          service.list,
        ).toHaveBeenCalledWith(
          query,
        );

        expect(
          result.items,
        ).toEqual([]);
      },
    );

    it(
      "should list current user's UApps",
      async () => {
        service.listMine =
          jest
            .fn()
            .mockResolvedValue({
              items: [],
              meta: {
                page: 1,
                limit: 20,
                total: 0,
                totalPages: 0,
              },
            });

        const result =
          await controller.listMine(
            {
              sub: "user-1",
              role: "user",
            } as any,
          );

        expect(
          service.listMine,
        ).toHaveBeenCalledWith(
          "user-1",
        );

        expect(
          result.items,
        ).toEqual([]);
      },
    );

    it(
      "should find UApp",
      async () => {
        service.findById =
          jest
            .fn()
            .mockResolvedValue({
              id: "app-1",
            });

        const result =
          await controller.findById(
            "app-1",
          );

        expect(
          service.findById,
        ).toHaveBeenCalledWith(
          "app-1",
        );

        expect(
          result.id,
        ).toBe("app-1");
      },
    );

    it(
      "should create UApp for current user",
      async () => {
        const dto: any = {
          name: "Test App",
        };

        const user: any = {
          sub: "user-1",
          role: "user",
        };

        service.create =
          jest
            .fn()
            .mockResolvedValue({
              id: "app-1",
            });

        const result =
          await controller.create(
            dto,
            user,
          );

        expect(
          service.create,
        ).toHaveBeenCalledWith(
          dto,
          user,
        );

        expect(
          result.id,
        ).toBe("app-1");
      },
    );

    it(
      "should update UApp for current user",
      async () => {
        const dto: any = {
          name: "Updated",
        };

        const user: any = {
          sub: "user-1",
          role: "user",
        };

        service.update =
          jest
            .fn()
            .mockResolvedValue({
              id: "app-1",
            });

        const result =
          await controller.update(
            "app-1",
            dto,
            user,
          );

        expect(
          service.update,
        ).toHaveBeenCalledWith(
          "app-1",
          dto,
          user,
        );

        expect(
          result.id,
        ).toBe("app-1");
      },
    );
  },
);