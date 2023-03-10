import {
	Body,
	Controller,
	Delete,
	Post,
	Param,
	Get,
	HttpException,
	HttpStatus,
	UsePipes,
	ValidationPipe,
	UseGuards,
} from '@nestjs/common';

import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.const';
import { ReviewDocument } from './schemas/review.schema';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { GetUserEmail } from './../decorators/userEmail.decorator';
@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDto): Promise<ReviewDocument> {
		return this.reviewService.create(dto);
	}

	@UseGuards(JwtGuard)
	@Delete(':id')
	async delete(@Param('id') id: string): Promise<ReviewDocument> {
		const deletedProduct = await this.reviewService.delete(id);
		if (!deletedProduct) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return deletedProduct;
	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') productId: string): Promise<ReviewDocument[]> {
		return this.reviewService.findProductById(productId);
	}
}
