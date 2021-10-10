import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization:
      'Bearer otBln-IuAVz16gBjIGNg-fjhsUKXA-ftnwRcGqdGwuBfE5-l8HcbkPioKiSijozxri4qKEjXzH7FD7g3WodTaXIMC1N9WyYmBRd0MOEqMPBVyib11tLmXcxLeiI1YXYx',
  },
});
