import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { Review, ReviewSchema } from './schemas/review.schema';
import { ReviewService } from './review.service';

@Module({
	controllers: [ReviewController],
	imports: [MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }])],
	providers: [ReviewService],
})
export class ReviewModule {}
