import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppealModule } from './hr/appeal/appeal.module';
import { CategoryQuestionModule } from './hr/category-question/category-question.module';
import { FlowRecordModule } from './hr/flow-record/flow-record.module';
import { FlowModule } from './hr/flow/flow.module';
import { LessonModule } from './hr/lesson/lesson.module';
import { LikeModule } from './hr/like/like.module';
import { QuestionsModule } from './hr/questions/questions.module';
import { QuizModule } from './hr/quiz/quiz.module';
import { ResultQuizModule } from './hr/result-quiz/result-quiz.module';
import { CharityModule } from './info-center/charity/charity.module';
import { CivilDefenseModule } from './info-center/civil-defense/civil-defense.module';
import { EntryFormModule } from './info-center/entry-form/entry-form.module';
import { HonorBoardModule } from './info-center/honor-board/honor-board.module';
import { IndustrialSafetyModule } from './info-center/industrial-safety/industrial-safety.module';
import { InfoBuildModule } from './info-center/info-build/info-build.module';
import { PosterOilmanModule } from './info-center/poster-oilman/poster-oilman.module';
import { RequirementsCeoModule } from './info-center/requirements-ceo/requirements-ceo.module';
import { ScheduleSportModule } from './info-center/schedule/schedule-sport/schedule-sport.module';
import { ScheduleTransportModule } from './info-center/schedule/schedule-transport/schedule-transport.module';
import { SocialProgramModule } from './info-center/social-program/social-program.module';
import { TrackRecordModule } from './info-center/track-record/track-record.module';
import { TransferSalaryModule } from './info-center/transfer-salary/transfer-salary.module';
import { AdModule } from './news/ad/ad.module';
import { GalleryModule } from './news/gallery/gallery.module';
import { ManagementPetitionModule } from './news/management-petition/management-petition.module';
import { NewsModule } from './news/news/news.module';
import { PressCenterModule } from './news/press-center/press-center.module';
import { DepartmentModule } from './organization/department/department.module';
import { GroupModule } from './organization/group/group.module';
import { AboutSocietyModule } from './society/about-society/about-society.module';
import { ManagementModule } from './society/management/management.module';
import { StructureModule } from './society/structure/structure.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        AuthModule,
        UserModule,
        QuestionsModule,
        QuizModule,
        ResultQuizModule,
        CategoryQuestionModule,
        DepartmentModule,
        GroupModule,
        AppealModule,
        LessonModule,
        FlowModule,
        FlowRecordModule,
        LikeModule,
        NewsModule,
        ScheduleTransportModule,
        AdModule,
        AboutSocietyModule,
        ManagementModule,
        StructureModule,
        TrackRecordModule,
        SocialProgramModule,
        CharityModule,
        HonorBoardModule,
        EntryFormModule,
        RequirementsCeoModule,
        PosterOilmanModule,
        PressCenterModule,
        GalleryModule,
        ScheduleSportModule,
        TransferSalaryModule,
        InfoBuildModule,
        IndustrialSafetyModule,
        CivilDefenseModule,
        ManagementPetitionModule
    ]
})
export class RoutesModule {}
