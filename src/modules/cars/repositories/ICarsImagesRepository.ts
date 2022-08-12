import { CarImage } from "../infra/typeorm/entities/CarImage";

// interface ICreateCarImageDTO {
//     car_id: string;
//     image_name: string;
// }

interface ICarsImagesRepository {
    create(car_id: string, image_name: string): Promise<CarImage>;
}

export { ICarsImagesRepository };
