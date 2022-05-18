import crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;

  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  static calculateHash(prevHash: string, height: number, data: string): string {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class Blockchain {
  private blocks: Block[];

  constructor() {
    this.blocks = [];
  }

  private getPrevHash() {
    if (this.blocks.length === 0) {
      return "";
    }
    return this.blocks[this.blocks.length - 1].hash;
  }

  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }

  public getBlocks() {
    const copyOfBlocks: Block[] = [];
    this.blocks.forEach((block, _) => {
      copyOfBlocks.push({ ...block });
    });
    return copyOfBlocks;
  }
}

const b = new Block("prevHash", 1, "data");
console.log(b);

const blockchain = new Blockchain();

blockchain.addBlock("1");
blockchain.addBlock("2");
blockchain.addBlock("3");

blockchain.getBlocks().push(new Block("x", 0, "x"));
blockchain.getBlocks()[0].data = "x";

console.log(blockchain.getBlocks());
