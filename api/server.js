// src/app.ts
import express from "express";
import cors from "cors";

// src/routes/index.ts
import { Router as Router5 } from "express";

// src/modules/medicine/medicine.route.ts
import { Router } from "express";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum OrderStatus {\n  PENDING\n  PAID\n  SHIPPED\n  DELIVERED\n  CANCELLED\n}\n\nenum Role {\n  admin\n  seller\n  customer\n}\n\nmodel User {\n  id            String     @id\n  name          String\n  email         String\n  emailVerified Boolean    @default(false)\n  image         String?\n  createdAt     DateTime   @default(now())\n  updatedAt     DateTime   @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n  medicines     Medicine[]\n  orders        Order[]\n  reviews       Review[]\n\n  banned     Boolean?  @default(false)\n  banReason  String?\n  banExpires DateTime?\n\n  address String?\n\n  role Role @default(customer)\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  impersonatedBy String?\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Category {\n  id          String   @id @default(uuid())\n  name        String\n  description String?\n  createdAt   DateTime @default(now())\n\n  medicines Medicine[]\n\n  @@map("category")\n}\n\nmodel Medicine {\n  id          String  @id @default(uuid())\n  name        String\n  description String?\n  price       Decimal\n  stock       Int\n  isAvailable Boolean @default(true)\n  imageUrl    String?\n\n  categoryId String\n  sellerId   String\n\n  category Category @relation(fields: [categoryId], references: [id])\n  seller   User     @relation(fields: [sellerId], references: [id])\n\n  reviews    Review[]\n  orderItems OrderItem[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("medicine")\n}\n\nmodel Order {\n  id          String      @id @default(uuid())\n  customerId  String\n  status      OrderStatus @default(PENDING)\n  totalAmount Decimal\n  createdAt   DateTime    @default(now())\n  updatedAt   DateTime    @updatedAt\n\n  customer User        @relation(fields: [customerId], references: [id])\n  items    OrderItem[]\n\n  @@map("order")\n}\n\nmodel OrderItem {\n  id         String  @id @default(uuid())\n  orderId    String\n  medicineId String\n  quantity   Int\n  price      Decimal\n\n  order    Order    @relation(fields: [orderId], references: [id])\n  medicine Medicine @relation(fields: [medicineId], references: [id])\n\n  @@map("orderItem")\n}\n\nmodel Review {\n  id         String   @id @default(uuid())\n  rating     Int\n  comment    String?\n  medicineId String\n  customerId String\n  createdAt  DateTime @default(now())\n\n  medicine Medicine @relation(fields: [medicineId], references: [id])\n  user     User     @relation(fields: [customerId], references: [id])\n\n  @@unique([medicineId, customerId])\n  @@map("review")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"MedicineToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"banned","kind":"scalar","type":"Boolean"},{"name":"banReason","kind":"scalar","type":"String"},{"name":"banExpires","kind":"scalar","type":"DateTime"},{"name":"address","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"},{"name":"impersonatedBy","kind":"scalar","type":"String"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"CategoryToMedicine"}],"dbName":"category"},"Medicine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMedicine"},{"name":"seller","kind":"object","type":"User","relationName":"MedicineToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"MedicineToReview"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MedicineToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"medicine"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"totalAmount","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"}],"dbName":"order"},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToOrderItem"}],"dbName":"orderItem"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToReview"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"}],"dbName":"review"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/medicine/medicine.service.ts
var createMedicine = (data) => prisma.medicine.create({ data });
var getMedicines = () => prisma.medicine.findMany({ include: { seller: true, category: true } });
var updateMedicine = (id, data) => prisma.medicine.update({ where: { id }, data });
var deleteMedicine = (id) => prisma.medicine.delete({ where: { id } });
var medicineService = {
  createMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine
};

// src/modules/medicine/medicine.controller.ts
var createMedicine2 = async (req, res) => {
  try {
    const data = await medicineService.createMedicine(req.body);
    res.json({ message: "Medicine created", data });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "message",
      details: e
    });
  }
};
var getMedicine = async (req, res) => {
  try {
    const data = await medicineService.getMedicines();
    res.status(200).json({ message: "All medicines", data });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "message",
      details: e
    });
  }
};
var updateMedicine2 = async (req, res) => {
  try {
    const data = await medicineService.updateMedicine(req.params.id, req.body);
    res.status(200).json({ message: "Medicine updated", data });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "message",
      details: e
    });
  }
};
var deleteMedicine2 = async (req, res) => {
  try {
    const data = await medicineService.deleteMedicine(req.params.id);
    res.status(200).json({ message: "Medicine deleted", data });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "message",
      details: e
    });
  }
};
var medicineController = {
  createMedicine: createMedicine2,
  getMedicine,
  updateMedicine: updateMedicine2,
  deleteMedicine: deleteMedicine2
};

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";

// src/lib/permission.ts
import { createAccessControl } from "better-auth/plugins";
var statement = {
  user: ["create", "read", "update", "delete"],
  medicine: ["create", "read", "update", "delete"],
  order: ["create", "read", "update", "delete"],
  orderItem: ["create", "read", "update", "delete"],
  review: ["create", "read", "update", "delete"],
  category: ["create", "read", "update", "delete"]
};
var ac = createAccessControl(statement);
var adminRoles = ac.newRole({
  user: ["create", "read", "update", "delete"],
  medicine: ["create", "read", "update", "delete"],
  order: ["create", "read", "update", "delete"],
  orderItem: ["create", "read", "update", "delete"],
  review: ["create", "read", "update", "delete"],
  category: ["create", "read", "update", "delete"]
});
var customerRoles = ac.newRole({
  medicine: ["read"],
  order: ["create", "read"],
  orderItem: ["create", "read", "update", "delete"],
  review: ["create", "read", "update", "delete"]
});
var sellerRoles = ac.newRole({
  medicine: ["create", "read", "update", "delete"],
  order: ["read", "update"],
  category: ["create", "read", "update", "delete"]
});

// src/lib/auth.ts
var auth = betterAuth({
  appName: "MediStore",
  baseURL: process.env.BETTER_AUTH_URL,
  // basePath: "/api/auth/",
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  trustedOrigins: [process.env.FRONTEND_URL],
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      role: {
        type: ["customer", "seller"],
        required: false,
        defaultValue: "customer",
        input: true
      },
      address: {
        type: "string",
        required: false
      }
    }
  },
  plugins: [
    admin({
      adminRoles: ["admin"],
      publicRoles: ["customer", "seller"],
      defaultRole: "customer",
      roles: {
        admin: adminRoles,
        customer: customerRoles,
        seller: sellerRoles
      }
    })
  ]
});

// src/middlewares/auth.ts
var auth2 = (resource, action) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) res.status(401).send({ message: "Unauthorized!" });
      const hasPermission = await auth.api.userHasPermission({
        body: {
          userId: session?.user.id,
          role: session?.user.role,
          permission: { [resource]: [action] }
        }
      });
      if (!hasPermission || !hasPermission.success) res.status(403).send({ message: `Forbidden: You are not allowed to ${action} ${resource}` });
      next();
    } catch (e) {
      console.error(e);
    }
  };
};
var auth_default = auth2;

// src/modules/medicine/medicine.route.ts
var medicineRouter = Router();
medicineRouter.post("/", auth_default("medicine", "create"), medicineController.createMedicine);
medicineRouter.get("/", auth_default("medicine", "read"), medicineController.getMedicine);
medicineRouter.patch("/:id", auth_default("medicine", "update"), medicineController.updateMedicine);
medicineRouter.delete("/:id", auth_default("medicine", "delete"), medicineController.deleteMedicine);
var medicine_route_default = medicineRouter;

// src/modules/category/category.route.ts
import { Router as Router2 } from "express";

// src/modules/category/category.service.ts
var createCategory = (data) => {
  return prisma.category.create({ data });
};
var getCategories = () => {
  return prisma.category.findMany();
};
var updateCategory = (id, data) => {
  return prisma.category.update({
    where: { id },
    data
  });
};
var deleteCategory = (id) => {
  return prisma.category.delete({
    where: { id }
  });
};
var categoryService = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
};

// src/modules/category/category.controller.ts
var createCategory2 = async (req, res) => {
  try {
    const data = await categoryService.createCategory(req.body);
    res.status(201).json({ message: "Category created", data });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "message",
      details: e
    });
  }
};
var getCategory = async (req, res) => {
  try {
    const data = await categoryService.getCategories();
    res.status(200).json({ message: "All categories", data });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "message",
      details: e
    });
  }
};
var updateCategory2 = async (req, res) => {
  try {
    const data = await categoryService.updateCategory(req.params.id, req.body);
    res.json({ message: "Category updated", data });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "message",
      details: e
    });
  }
};
var deleteCategory2 = async (req, res) => {
  try {
    const data = await categoryService.deleteCategory(req.params.id);
    res.status(200).json({ message: "Category deleted", data });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "message",
      details: e
    });
  }
};
var categoryController = {
  createCategory: createCategory2,
  getCategory,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/modules/category/category.route.ts
var categoryRouter = Router2();
categoryRouter.post("/", auth_default("category", "create"), categoryController.createCategory);
categoryRouter.get("/", auth_default("category", "read"), categoryController.getCategory);
categoryRouter.patch("/:id", auth_default("category", "update"), categoryController.updateCategory);
categoryRouter.delete("/:id", auth_default("category", "delete"), categoryController.deleteCategory);
var category_route_default = categoryRouter;

// src/modules/order/order.route.ts
import { Router as Router3 } from "express";

// src/modules/order/order.service.ts
var createOrder = (data) => prisma.order.create({ data });
var getOrders = () => prisma.order.findMany({ include: { customer: true, items: true } });
var updateOrder = (id, data) => prisma.order.update({
  where: { id },
  data
});
var deleteOrder = (id) => prisma.order.delete({ where: { id } });
var orderService = {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder
};

// src/modules/order/order.controller.ts
var createOrder2 = async (req, res) => {
  try {
    const data = await orderService.createOrder(req.body);
    res.send({
      message: "Order created",
      data
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      error: "message",
      details: e
    });
  }
};
var getOrders2 = async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    res.send({
      message: "All Orders",
      data: orders
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      error: "message",
      details: e
    });
  }
};
var updateOrder2 = async (req, res) => {
  try {
    const data = await orderService.updateOrder(req.params.id, req.body);
    res.status(200).json({ message: "Order updated", data });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      error: "message",
      details: e
    });
  }
};
var deleteOrder2 = async (req, res) => {
  try {
    const data = await orderService.deleteOrder(req.params.id);
    res.status(200).json({ message: "Order deleted", data });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      error: "message",
      details: e
    });
  }
};
var orderController = {
  createOrder: createOrder2,
  getOrders: getOrders2,
  updateOrder: updateOrder2,
  deleteOrder: deleteOrder2
};

// src/modules/order/order.route.ts
var orderRouter = Router3();
orderRouter.post("/", auth_default("order", "create"), orderController.createOrder);
orderRouter.get("/", auth_default("order", "read"), orderController.getOrders);
orderRouter.patch("/:id", auth_default("order", "update"), orderController.updateOrder);
orderRouter.delete("/:id", auth_default("order", "delete"), orderController.deleteOrder);
var order_route_default = orderRouter;

// src/modules/review/review.route.ts
import { Router as Router4 } from "express";

// src/modules/review/review.service.ts
var createReview = (data) => prisma.review.create({ data });
var getReviews = () => prisma.review.findMany({ include: { medicine: true, user: true } });
var deleteReview = (id) => prisma.review.delete({ where: { id } });
var reviewService = {
  createReview,
  getReviews,
  deleteReview
};

// src/modules/review/review.controller.ts
var createReview2 = async (req, res) => {
  try {
    const data = await reviewService.createReview(req.body);
    res.status(201).json({ message: "Review created.", data });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      error: "message",
      details: e
    });
  }
};
var getReviews2 = async (req, res) => {
  try {
    const data = await reviewService.getReviews();
    res.status(200).json({ message: "All reviews", data });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      error: "message",
      details: e
    });
  }
};
var deleteReview2 = async (req, res) => {
  try {
    const data = await reviewService.deleteReview(req.params.id);
    res.status(200).json({ message: "Review deleted.", data });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      error: "message",
      details: e
    });
  }
};
var reviewController = {
  createReview: createReview2,
  getReviews: getReviews2,
  deleteReview: deleteReview2
};

// src/modules/review/review.route.ts
var reviewRouter = Router4();
reviewRouter.post("/", auth_default("review", "create"), reviewController.createReview);
reviewRouter.get("/", auth_default("review", "create"), reviewController.getReviews);
reviewRouter.delete("/:id", auth_default("review", "create"), reviewController.deleteReview);
var review_route_default = reviewRouter;

// src/routes/index.ts
var routes = Router5();
routes.use("/category", category_route_default);
routes.use("/medicine", medicine_route_default);
routes.use("/order", order_route_default);
routes.use("/review", review_route_default);
routes.use("/orderItem", review_route_default);
var routes_default = routes;

// src/app.ts
import { toNodeHandler } from "better-auth/node";
var app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use("/api", routes_default);
var app_default = app;

// src/server.ts
var port = process.env.PORT || 4e3;
async function server() {
  try {
    await prisma.$disconnect();
    app_default.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
server();
