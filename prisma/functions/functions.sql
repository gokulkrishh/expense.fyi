begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;