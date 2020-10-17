import { AxiosResponse } from 'axios';

function isResponseOk(response: AxiosResponse): boolean {
  return (response.status === 200 && response.data.status === 'success');
}

export default isResponseOk;
