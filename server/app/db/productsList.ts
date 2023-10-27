import pg from "../config/pg";

interface product {
  type: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

const shirts: product[] = [
  {
    type: "clothes",
    name: "Spread Collared Checked Shirt",
    price: 40,
    image: "https://assets.ajio.com/medias/sys_master/root/20230808/9x9d/64d2474aeebac147fcb45b0a/-473Wx593H-466434087-white-MODEL.jpg",
    description: "A well fitted shirt that looks cool on you",
  },
  {
    type: "clothes",
    name: "Checked Slim Fit Shirt",
    price: 45,
    image: "https://assets.ajio.com/medias/sys_master/root/20221114/z62T/63721b27f997ddfdbd705a2a/-473Wx593H-443002365-olive-MODEL.jpg",
    description: "Checked well slim fit shirt that suits you",
  },
  {
    type: "clothes",
    name: "Striped Slim Fit Shirt",
    price: 66,
    image: "https://assets.ajio.com/medias/sys_master/root/20221230/TcR4/63ae867ff997ddfdbd03618e/-473Wx593H-443002330-navy-MODEL5.jpg",
    description: "Get that striped shirt on your body",
  },
  {
    type: "clothes",
    name: "Checked Shirt with Patch Pocket",
    price: 30,
    image: "https://assets.ajio.com/medias/sys_master/root/20230525/9A61/646e815c42f9e729d7aee13e/-473Wx593H-464250821-blue-MODEL4.jpg",
    description: "Get a cool shirt with patch pocket",
  },
  {
    type: "clothes",
    name: "Full-Sleeve Casual Shirt",
    price: 56,
    image: "https://assets.ajio.com/medias/sys_master/root/20230826/SEyJ/64e92b02afa4cf41f58c5c01/-473Wx593H-466500072-orange-MODEL3.jpg",
    description: "Casual shirt that rocks on you",
  },
  {
    type: "clothes",
    name: "Men Slim Fit Shirt with Welt Pocket",
    price: 82,
    image: "https://assets.ajio.com/medias/sys_master/root/20220927/cggF/633329c9f997dd1f8d208fc5/-473Wx593H-441147076-white-MODEL3.jpg",
    description: "Slim fit shirt comes with an extra Pocket",
  },
  {
    type: "clothes",
    name: "Checked Slim Fit Shirt",
    price: 46,
    image: "https://assets.ajio.com/medias/sys_master/root/20221102/HTaq/63624894f997ddfdbd5105fb/-473Wx593H-443002372-darkred-MODEL5.jpg",
    description: "A Slim fit shirt that is suitable for you",
  },
  {
    type: "clothes",
    name: "Spread-Collar Shirt with Patch Pocket",
    price: 32,
    image: "https://assets.ajio.com/medias/sys_master/root/20230827/9lxk/64ea5171ddf77915197ef1da/-473Wx593H-466500072-maroon-MODEL6.jpg",
    description: "Collar spreaded shirt get an extra Pocket",
  },
  {
    type: "clothes",
    name: "Checked Slim Fit Shirt with Patch Pocket",
    price: 40,
    image: "https://assets.ajio.com/medias/sys_master/root/20220629/sFkx/62bc0339aeb26921af4f49b4/-473Wx593H-469234311-green-MODEL.jpg",
    description: "Newest shirt in the market only for you",
  },
  {
    type: "clothes",
    name: "Full-Sleeve Casual Shirt",
    price: 40,
    image: "https://assets.ajio.com/medias/sys_master/root/20230826/haSf/64e92aeaafa4cf41f58c591c/-473Wx593H-466500072-olive-MODEL6.jpg",
    description: "Get full sleeve casual shirt that suits on you",
  },
];

const mobiles: product[] = [
  {
    type: "mobile",
    name: "realme C53 (Champion Gold, 128 GB) (4 GB RAM)",
    price: 120,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/h/h/d/-original-imags487gaqqhcea.jpeg?q=70",
    description: "Newest mobile in the market with 128 GB ROM and 4 GB RAM",
  },
  {
    type: "mobile",
    name: "POCO C51 - Locked with Airtel Prepaid (Royal Blue, 64 GB) (4 GB RAM)",
    price: 80,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/9/i/h/-original-imagt4tdvvhyag9j.jpeg?q=70",
    description: "POCO mobile that comes with an Airtel Prepaid SIM",
  },
  {
    type: "mobile",
    name: "REDMI 12 (Pastel Blue, 128 GB) (4 GB RAM)",
    price: 90,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/e/a/g/-original-imags37h4prxjazz.jpeg?q=70",
    description: "REDMI mobile that comes with 128 GB and 4 GB RAM",
  },
  {
    type: "mobile",
    name: "REDMI 12 (Moonstone Silver, 128 GB) (4 GB RAM)",
    price: 110,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/k/j/n/-original-imags37gyajqxkgp.jpeg?q=70",
    description: "Buy REDMI mobile only available on shoppingCart",
  },
  {
    type: "mobile",
    name: "POCO C55 (Power Black, 128 GB) (6 GB RAM)",
    price: 140,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/b/y/g/-original-imagnfzybft7wzmp.jpeg?q=70",
    description: "Latest POCO mobile in the market you can get only on shoppingCart",
  },
  {
    type: "mobile",
    name: "APPLE iPhone 13 (Starlight, 128 GB)",
    price: 399,
    image: "https://rukminim2.flixcart.com/image/416/416/ktketu80/mobile/6/n/d/iphone-13-mlpg3hn-a-apple-original-imag6vpyghayhhrh.jpeg?q=70",
    description: "Get the latest APPLE iphone 13 that comes with 128 GB ROM",
  },
  {
    type: "mobile",
    name: "MOTOROLA Edge 40 (Nebula Green, 256 GB) (8 GB RAM)",
    price: 299,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/2/m/o/edge-40-pay40030in-motorola-original-imagpqzchzhg6fex.jpeg?q=70",
    description: "MOTOROLA mobile with massive 256 GB ROM and 8 GB RAM",
  },
  {
    type: "mobile",
    name: "MOTOROLA Edge 40 (Viva Magenta, 256 GB) (8 GB RAM)",
    price: 299,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/h/a/k/-original-imagqx45wnzbh25s.jpeg?q=70",
    description: "Edge 40 with a Magenta color available on shoppingCart",
  },
  {
    type: "mobile",
    name: "realme 11 Pro 5G (Sunrise Beige, 128 GB) (8 GB RAM)",
    price: 199,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/l/8/d/-original-imagqadpnygfnn2v.jpeg?q=70",
    description: "relame mobile released in the market only available on shoppingCart with 128 GB ROM and 4 GB RAM",
  },
  {
    type: "mobile",
    name: "vivo V29e 5G (Artistic Red, 128 GB) (8 GB RAM)",
    price: 189,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/h/o/e/-original-imagstfsbhaaxbeb.jpeg?q=70",
    description: "Vivo mobile that comes with an 128 GB ROM",
  },
];


const watches: product[] = [
  {
    type: "watch",
    name: "Men RG-MSLC71000002 Water-Resistant Chronograph Watch",
    price: 60,
    image: "https://assets.ajio.com/medias/sys_master/root/20220401/9pcU/6246f7e4aeb26921af06d6eb/-473Wx593H-469177563-black-MODEL3.jpg",
    description: "A black watch for men comes with Water-Resistance property",
  },
  {
    type: "watch",
    name: "RGMSLC78000003 Chronograph Watch with Tang Buckle Closure",
    price: 40,
    image: "https://assets.ajio.com/medias/sys_master/root/20230602/Nk9a/647a18bc42f9e729d71f3922/-473Wx593H-466230227-black-MODEL.jpg",
    description: "A Chrnograph watch that comes with a Tang Buckle Closure",
  },
  {
    type: "watch",
    name: "H810RN Analogue Watch",
    price: 32,
    image: "https://assets.ajio.com/medias/sys_master/root/20230621/QXbH/6492f232d55b7d0c639cc7f3/-473Wx593H-462347733-multi-MODEL9.jpg",
    description: "Get the cool Analog Watch by MATHEY- TISSOT",
  },
  {
    type: "watch",
    name: "Men CE5026 Everett Water-Resistant Analogue Watch",
    price: 60,
    image: "https://assets.ajio.com/medias/sys_master/root/20221209/w1sQ/63936572aeb269659ce0f52b/-473Wx593H-4932395440-multi-MODEL8.jpg",
    description: "Water-Resistant Analogue Watch by FOSSIL",
  },
  {
    type: "watch",
    name: "G310 G-Shock Men (GD-100-1BDR) Digital Wrist Watch",
    price: 99,
    image: "https://assets.ajio.com/medias/sys_master/root/20220826/1zx1/6308e4a5aeb2691761a841e3/-473Wx593H-4907835180-multi-MODEL9.jpg",
    description: "GET the premium CASIO Digital Wrist Watch only for men",
  },
  {
    type: "watch",
    name: "FTW4062 GEN 6 Smart Watch with Leather Strap",
    price: 70,
    image: "https://assets.ajio.com/medias/sys_master/root/20220304/HFC9/62211229aeb26921afc7075d/-473Wx593H-4919979330-multi-MODEL4.jpg",
    description: "FOSSIL Watch that comes with a Leather Strap",
  },
  {
    type: "watch",
    name: "Men Fossilfs4682lg rd blk blk brc",
    price: 88,
    image: "https://assets.ajio.com/medias/sys_master/root/20221104/t09y/63652af4aeb269659c72dd99/-473Wx593H-4915036890-multi-MODEL2.jpg",
    description: "A Watch by FOSSIL that suits you the best",
  },
  {
    type: "watch",
    name: "Men FS5437 Water-Resistant Chronograph Watch",
    price: 59,
    image: "https://assets.ajio.com/medias/sys_master/root/20220409/TCTB/625084f7f997dd03e2509f20/-473Wx593H-4915506200-multi-MODEL5.jpg",
    description: "ROLEX Watch that comes with Leather straps and Water-Resistancy",
  },
  {
    type: "watch",
    name: "NP1696QC02 Water-Resistant Analogue Watch",
    price: 66,
    image: "https://assets.ajio.com/medias/sys_master/root/20220528/otOW/6291ba70aeb26921aff07083/-473Wx593H-4925844090-multi-MODEL6.jpg",
    description: "A silver coloured Water-Resistant Watch by TITAN",
  },
  {
    type: "watch",
    name: "Men NDTH1791880 Water-Resistant Analogue Watch",
    price: 299,
    image: "https://assets.ajio.com/medias/sys_master/root/20221228/WoQx/63ac5407f997ddfdbdfecacc/-473Wx593H-4933507490-multi-MODEL4.jpg",
    description: "Men's Analoue Water-Resistant Watch by TOMMY HILFIGHER",
  },
];

export const addProducts = () => {
  const products = [...shirts,...mobiles,...watches];

  for(let i of products) {
    async function addProduct(p: product) {
      const {description,image,name,price,type} = p;
      const rating = ((Math.random() * 2) + 3).toFixed(2);

      const values = [name,type,description,image,price, rating];
      
      try {
        const add = await pg.query(
          `INSERT INTO products (product_name, type, description, image, price, rating) 
            VALUES ($1, $2 ,$3, $4, $5, $6)`,
          values
        );

        console.log("Added new product");
      } catch(error) {
        console.log("Product add error",error);
      }
    };

    addProduct(i);
  };

  console.log("ADding process completed");
};