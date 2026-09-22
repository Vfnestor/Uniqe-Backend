import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import {
  PrismaService,
} from "../../database/prisma.service";

import type {
  UpdatePreferencesDto,
  UpdateProfileDto,
} from "./dto";

import {
  mapAccount,
  mapPreferences,
  mapProfile,
  mapUser,
} from "./users.mapper";

import type {
  UserAccountResponse,
} from "./users.types";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getMe(
    userId: string,
  ): Promise<UserAccountResponse> {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          profile: true,
          preferences: true,
        },
      });

    if (!user) {
      throw new NotFoundException(
        "User not found.",
      );
    }

    return mapAccount(
      user,
      user.profile,
      user.preferences,
    );
  }

  async getProfile(
    userId: string,
  ) {
    const profile =
      await this.prisma.userProfile.findUnique({
        where: {
          userId,
        },
      });

    if (!profile) {
      throw new NotFoundException(
        "User profile not found.",
      );
    }

    return mapProfile(profile);
  }

  async updateProfile(
    userId: string,
    dto: UpdateProfileDto,
  ) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (!user) {
      throw new NotFoundException(
        "User not found.",
      );
    }

    const data: {
      displayName?: string;
      bio?: string;
      avatarUrl?: string;
      language?: string;
      theme?:
        | "SYSTEM"
        | "LIGHT"
        | "DARK";
    } = {};

    if (
      dto.displayName !==
      undefined
    ) {
      data.displayName =
        dto.displayName.trim();
    }

    if (
      dto.bio !== undefined
    ) {
      data.bio =
        dto.bio.trim();
    }

    if (
      dto.avatarUrl !==
      undefined
    ) {
      data.avatarUrl =
        dto.avatarUrl.trim();
    }

    if (
      dto.language !==
      undefined
    ) {
      data.language =
        dto.language.trim();
    }

    if (
      dto.theme !== undefined
    ) {
      data.theme =
        dto.theme.toUpperCase() as
          | "SYSTEM"
          | "LIGHT"
          | "DARK";
    }

    const profile =
      await this.prisma.userProfile.upsert({
        where: {
          userId,
        },
        create: {
          userId,
          displayName:
            data.displayName ||
            user.name,
          bio:
            data.bio,
          avatarUrl:
            data.avatarUrl ||
            user.avatarUrl,
          language:
            data.language ||
            "en",
          theme:
            data.theme ||
            "SYSTEM",
        },
        update: data,
      });

    return mapProfile(profile);
  }

  async getPreferences(
    userId: string,
  ) {
    const preferences =
      await this.prisma.userPreferences.findUnique({
        where: {
          userId,
        },
      });

    if (!preferences) {
      const created =
        await this.prisma.userPreferences.create({
          data: {
            userId,
          },
        });

      return mapPreferences(
        created,
      );
    }

    return mapPreferences(
      preferences,
    );
  }

  async updatePreferences(
    userId: string,
    dto: UpdatePreferencesDto,
  ) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (!user) {
      throw new NotFoundException(
        "User not found.",
      );
    }

    const data: {
      theme?:
        | "SYSTEM"
        | "LIGHT"
        | "DARK";
      language?: string;
      notificationsEnabled?: boolean;
    } = {};

    if (
      dto.theme !== undefined
    ) {
      data.theme =
        dto.theme.toUpperCase() as
          | "SYSTEM"
          | "LIGHT"
          | "DARK";
    }

    if (
      dto.language !==
      undefined
    ) {
      data.language =
        dto.language.trim();
    }

    if (
      dto.notificationsEnabled !==
      undefined
    ) {
      data.notificationsEnabled =
        dto.notificationsEnabled;
    }

    const preferences =
      await this.prisma.userPreferences.upsert({
        where: {
          userId,
        },
        create: {
          userId,
          ...data,
        },
        update: data,
      });

    return mapPreferences(
      preferences,
    );
  }

  async updateUserAvatar(
    userId: string,
    avatarUrl: string,
  ) {
    const user =
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          avatarUrl,
        },
      });

    return mapUser(user);
  }
}