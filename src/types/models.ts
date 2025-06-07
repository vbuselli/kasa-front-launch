export type Asset = {
  id: string;
  name: string;
  address: string;
  total_shares: number;
  reserved_shares: number;
  owned_shares: number;
  is_bought: boolean;
  total_price: number;
  bedrooms: number;
  bathrooms: number;
  square_cm: number;
  highlights: string;
  image_paths: string;
  spv_name: string;
  spv_id: string;
  spv_ruc: string;
  spv_address: string;
  spv_shares1: number;
  spv_shares2: number;
  spv_share_price: number;
  minimum_investment: number;
  project_duration: number;
  rent_roi: number;
  apreciation_roi: number;
  bank_name: string;
  bank_cci: string;
  bank_number_account: string;
};

export type AssetToken = {
  id: string;
  asset_id: string;
  user_id: string;
  num_shares: number;
  price: number;
  commission: number;
  transaction_number: string;
  pending_document_id: string | null;
  document_sign_url: string | null;
  contract_signed: boolean;
  state: string;
  created_at: string;
  expires_at: Date;
};

export type AssetPopulated = AssetToken & {
  asset: Asset;
};

export type User = {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
  };
  identities: Array<{
    identity_id: string;
    id: string;
    user_id: string;
    identity_data: {
      email: string;
      email_verified: boolean;
      phone_verified: boolean;
      sub: string;
    };
    provider: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
    email: string;
  }>;
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
};
