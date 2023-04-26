import { createUnsecuredToken, Json } from 'jsontokens';
import { GetAddressOptions } from './types';
import { provider } from '../config';

export const getAddress = async (options: GetAddressOptions) => {
  const { message, network, purposes } = options.payload;
  if (!provider) {
    throw new Error('No Bitcoin Wallet installed');
  }
  if(!purposes) {
    throw new Error('Address purposes are required');
  }
  try {
    const request = createUnsecuredToken(options.payload as unknown as Json);
    const addressResponse = await provider.connect(request);
    options.onFinish?.(addressResponse);
  } catch (error) {
    console.error('[Connect] Error during address request', error);
    options.onCancel?.();
  }
};

export * from './types';
