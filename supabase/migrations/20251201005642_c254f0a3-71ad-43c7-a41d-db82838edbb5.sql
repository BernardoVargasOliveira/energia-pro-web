-- Remove the public read access policy (CRITICAL SECURITY FIX)
DROP POLICY IF EXISTS "Public read access for leads" ON public.leads;

-- Create SELECT policy - only authenticated users (admin/staff) can read leads
CREATE POLICY "Only authenticated users can read leads"
ON public.leads
FOR SELECT
TO authenticated
USING (true);

-- Create UPDATE policy - only authenticated users can update leads
CREATE POLICY "Only authenticated users can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create DELETE policy - only authenticated users can delete leads
CREATE POLICY "Only authenticated users can delete leads"
ON public.leads
FOR DELETE
TO authenticated
USING (true);

-- Note: The existing "Anyone can submit leads" INSERT policy remains unchanged
-- This allows the contact form to continue working for anonymous users