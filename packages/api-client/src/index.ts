/**
 * @janbhasha/api-client
 * Typed HTTP client SDK for Janbhasha Platform services
 */

import { ApiClient, ApiClientConfig } from './client';
import { AuthEndpoint } from './endpoints/auth';
import { LessonsEndpoint } from './endpoints/lessons';
import { AssessmentsEndpoint } from './endpoints/assessments';
import { SyncEndpoint } from './endpoints/sync';
import { TranslationEndpoint } from './endpoints/translation';

export * from './client';
export * from './endpoints/auth';
export * from './endpoints/lessons';
export * from './endpoints/assessments';
export * from './endpoints/sync';
export * from './endpoints/translation';

export class JanbhashaSdk {
  public client: ApiClient;
  public auth: AuthEndpoint;
  public lessons: LessonsEndpoint;
  public assessments: AssessmentsEndpoint;
  public sync: SyncEndpoint;
  public translation: TranslationEndpoint;

  constructor(config: ApiClientConfig) {
    this.client = new ApiClient(config);
    this.auth = new AuthEndpoint(this.client);
    this.lessons = new LessonsEndpoint(this.client);
    this.assessments = new AssessmentsEndpoint(this.client);
    this.sync = new SyncEndpoint(this.client);
    this.translation = new TranslationEndpoint(this.client);
  }
}
