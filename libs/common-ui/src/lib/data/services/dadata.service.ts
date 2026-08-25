import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DADATA_TOKEN } from './DADATA_TOKEN';
import { map, Observable } from 'rxjs';
import { DadataSuggestion } from '../interfaces/dadata.interface';

@Service()
export class DadataService {
  private readonly _apiUrl: string =
    'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  private readonly _http: HttpClient = inject(HttpClient);

  getSuggestion(query: string): Observable<DadataSuggestion[]> {
    return this._http
      .post<{ suggestions: DadataSuggestion[] }>(
        this._apiUrl,
        { query },
        {
          headers: {
            Authorization: `Token ${DADATA_TOKEN}`,
          },
        },
      )
      .pipe(
        map((result: { suggestions: DadataSuggestion[] }): DadataSuggestion[] => {
          return result.suggestions;
        }),
      );
  }
}
