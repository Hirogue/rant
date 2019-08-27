import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Carousel } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const urls = ["https://www.lvyoto.com/runtime/storage/contents/48c8f851-e94a-4deb-9351-2ea2b8806c6b_20190528092820_首页_005.jpg",
                   "http://www.lvyoto.com/runtime/storage/contents/48c8f851-e94a-4deb-9351-2ea2b8806c6b_20190529114403_促进会.jpg",
                   "http://www.lvyoto.com/runtime/storage/contents/48c8f851-e94a-4deb-9351-2ea2b8806c6b_20190822112005_1.jpg"];
      for (let url of urls ) {

        await factory(Carousel)({
          title: '',
          url,
          link: '',
          is_published: true,
          sort: 0
      }).seed();
      }
    }
}
