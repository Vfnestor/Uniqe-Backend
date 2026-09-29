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

      listPendingReview:
        jest.fn(),

      findById:
        jest.fn(),

      create:
        jest.fn(),

      update:
        jest.fn(),

      submitForReview:
        jest.fn(),

      approve:
        jest.fn(),

      reject:
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
      "should list public UApps",
      async () => {
        const query: any = {
          page: 1,
          limit: 20,
        };

        service.list =
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
      "should list pending UApps for moderation",
      async () => {
        service.listPendingReview =
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
          await controller.listPendingReview();

        expect(
          service.listPendingReview,
        ).toHaveBeenCalled();

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
            {
              sub: "user-1",
              role: "user",
            } as any,
          );

        expect(
          service.findById,
        ).toHaveBeenCalledWith(
          "app-1",
          expect.objectContaining({
            sub: "user-1",
          }),
        );

        expect(
          result.id,
        ).toBe("app-1");
      },
    );

    it(
      "should create UApp",
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
      "should update UApp",
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

    it(
      "should submit UApp for review",
      async () => {
        const user: any = {
          sub: "user-1",
          role: "user",
        };

        service.submitForReview =
          jest
            .fn()
            .mockResolvedValue({
              id: "app-1",
              reviewStatus:
                "pending-review",
            });

        const result =
          await controller.submitForReview(
            "app-1",
            user,
          );

        expect(
          service.submitForReview,
        ).toHaveBeenCalledWith(
          "app-1",
          user,
        );

        expect(
          result.reviewStatus,
        ).toBe(
          "pending-review",
        );
      },
    );

    it(
      "should approve UApp",
      async () => {
        service.approve =
          jest
            .fn()
            .mockResolvedValue({
              id: "app-1",
              reviewStatus:
                "approved",
            });

        const result =
          await controller.approve(
            "app-1",
          );

        expect(
          service.approve,
        ).toHaveBeenCalledWith(
          "app-1",
        );

        expect(
          result.reviewStatus,
        ).toBe(
          "approved",
        );
      },
    );

    it(
      "should reject UApp",
      async () => {
        const dto: any = {
          reason:
            "Application needs more information.",
        };

        service.reject =
          jest
            .fn()
            .mockResolvedValue({
              id: "app-1",
              reviewStatus:
                "rejected",
              rejectionReason:
                dto.reason,
            });

        const result =
          await controller.reject(
            "app-1",
            dto,
          );

        expect(
          service.reject,
        ).toHaveBeenCalledWith(
          "app-1",
          dto,
        );

        expect(
          result.reviewStatus,
        ).toBe(
          "rejected",
        );
      },
    );
  },
);