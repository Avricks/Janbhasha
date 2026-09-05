import { ApiClient } from '../client';
import { SyncRequestPayload, SyncResponsePayload } from '@janbhasha/domain';

export class SyncEndpoint {
  constructor(private client: ApiClient) {}

  public async synchronize(payload: SyncRequestPayload): Promise<SyncResponsePayload> {
    return this.client.post<SyncResponsePayload>('/api/v1/sync', payload);
  }

  public async getLatestServerChanges(sinceTimestamp: number): Promise<SyncResponsePayload> {
    return this.client.get<SyncResponsePayload>(`/api/v1/sync/changes?since=${sinceTimestamp}`);
  }
}
