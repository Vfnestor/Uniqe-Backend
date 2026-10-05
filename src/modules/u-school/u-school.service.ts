import { Injectable } from "@nestjs/common";

@Injectable()
export class USchoolService {
  getStatus() {
    return {
      name: "U School",
      status: "online",
      version: "0.1.0",
      message: "U School backend core is running.",
    };
  }

  getArchitecture() {
    return {
      platform: "U School",
      architecture: {
        categories: true,
        learningStyles: true,
        courses: true,
        chapters: true,
        lessons: true,
        contentEngine: true,
        activityEngine: true,
        missionEngine: true,
        storyEngine: true,
        decisionEngine: true,
        knowledgeEngine: true,
        skillEngine: true,
        projectEngine: true,
        progressEngine: true,
        rewardEngine: true,
        learningProfile: true,
      },
    };
  }
}