import {type Cat} from '../types/index'


interface CatApiResponse {
  id: string;
  tags: string[];
  createdAt: string;
  url: string;
  mimetype: string;
}

interface ApiError{
  message: string;
  status: number;
  error?: any;
}

const randomNumber = (min : number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const API_BASE_URL = import.meta.env.VITE_BASE_URL

class APIService{
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL){
    this.baseURL = baseURL;
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      console.log(`${this.baseURL}${endpoint}`);
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw await this.handleError(response);
      }

      return await response.json();
    } catch (error) {
      throw this.handleException(error);
    }
  }

  private async handleError(response: Response): Promise<ApiError> {
    let errorMessage = 'An error occurred';
    let errorDetails;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
      errorDetails = errorData;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }

    return {
      message: errorMessage,
      status: response.status,
      error: errorDetails,
    };
  }

  private handleException(error: any): ApiError {
    if (error.message && error.status) {
      return error as ApiError;
    }

    return {
      message: error.message || 'Network error occurred',
      status: 0,
      error,
    };
  }




}


const apiService = new APIService();
export default apiService;

export const catApi =  {
  getCatJson: async (tags:string[]): Promise<Cat[]> => {
    let urlTags : string = '/cat?json=true';
    tags.push('');
    let tag : string = '';
    const NUM_CALLS = 20;

    const fetchPromises: Promise<Cat[]>[] = Array.from({ length: NUM_CALLS }).map(() => 
      (async () => {
        try {
          tag = tags[randomNumber(tags.length, 0)];
          if(tags.length > 0 && tag != ''){
            urlTags = '/cat/' + tag + '?json=true'; 
          } else{
            urlTags = '/cat?json=true';
          }
          const apiResponse = await apiService.get<CatApiResponse[]>(urlTags);

          return  apiResponse;
        } catch (error) {
          // Log and return an empty array or throw, depending on error handling strategy
          console.error(`Error during cat fetch (Call failed):`, error);
          return []; // Return empty array to not halt Promise.all
        }
      })()
    );
    const results: Cat[][] = await Promise.all(fetchPromises);
    const aggregatedCats: Cat[] = results.flat();

    return aggregatedCats;
  },


  getCatTag: async (): Promise<string[]> => {
    try {
      const apiResponse = await apiService.get<string[]>('/api/tags');
      return apiResponse;
    } catch (error) {
      console.error(`Error during tag fetch:`, error);
      return [];
    }
  }
} 


