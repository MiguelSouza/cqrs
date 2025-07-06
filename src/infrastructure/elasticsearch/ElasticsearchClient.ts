import { Client } from "@elastic/elasticsearch";

export class ElasticsearchClient {
  private readonly client = new Client({ node: "http://localhost:9200" });

  async index({
    index,
    id,
    document,
  }: {
    index: string;
    id: string;
    document: any;
  }) {
    return this.client.index({ index, id, document });
  }

  async search(params: any) {
    return this.client.search(params);
  }
}
