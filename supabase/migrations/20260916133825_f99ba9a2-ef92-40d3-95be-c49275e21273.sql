CREATE TABLE public.walkthrough_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  facility_type TEXT NOT NULL,
  square_footage TEXT,
  frequency TEXT,
  locations TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT INSERT ON public.walkthrough_requests TO anon;
GRANT INSERT, SELECT ON public.walkthrough_requests TO authenticated;
GRANT ALL ON public.walkthrough_requests TO service_role;
ALTER TABLE public.walkthrough_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a walkthrough request" ON public.walkthrough_requests FOR INSERT TO anon, authenticated WITH CHECK (true);