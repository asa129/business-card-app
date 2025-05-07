import "@testing-library/jest-dom";
import { config } from "dotenv";

config();

// eslint-disable-next-line @typescript-eslint/no-require-imports
global.TextEncoder = require("util").TextEncoder;

// eslint-disable-next-line @typescript-eslint/no-require-imports
global.TextDecoder = require("util").TextDecoder;
