
// This file contains SQL queries for the database management functionality

export const SELECT_ALL_TABLES_SQL = `
SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public';
`;

export const TABLE_RECORDS_SQL = (tableName: string, limit: number = 50) => `
SELECT * FROM "${tableName}" LIMIT ${limit};
`;

export const COUNT_RECORDS_SQL = (tableName: string) => `
SELECT COUNT(*) FROM "${tableName}";
`;

export const TABLE_SCHEMA_SQL = (tableName: string) => `
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM 
  information_schema.columns
WHERE 
  table_schema = 'public' 
  AND table_name = '${tableName}'
ORDER BY 
  ordinal_position;
`;

export const CREATE_DATABASE_FUNCTIONS_SQL = `
-- Create a function to select from a table with a dynamic table name
CREATE OR REPLACE FUNCTION select_from_table(table_name text, row_limit int DEFAULT 50)
RETURNS SETOF json AS $$
DECLARE
  query text;
BEGIN
  query := format('SELECT * FROM %I LIMIT %s', table_name, row_limit);
  RETURN QUERY EXECUTE query;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get all tables in the public schema
CREATE OR REPLACE FUNCTION get_all_tables()
RETURNS TABLE(tablename text) AS $$
BEGIN
  RETURN QUERY SELECT t.tablename::text FROM pg_catalog.pg_tables t
  WHERE t.schemaname = 'public';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get records from a specific table
CREATE OR REPLACE FUNCTION get_table_records(table_name text)
RETURNS SETOF json AS $$
DECLARE
  query text;
BEGIN
  query := format('SELECT * FROM %I LIMIT 50', table_name);
  RETURN QUERY EXECUTE query;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to count records in a specific table
CREATE OR REPLACE FUNCTION count_table_records(table_name text)
RETURNS TABLE(total_count bigint) AS $$
DECLARE
  query text;
BEGIN
  query := format('SELECT COUNT(*) FROM %I', table_name);
  RETURN QUERY EXECUTE query;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get a specific record by ID
CREATE OR REPLACE FUNCTION get_record_by_id(table_name text, record_id uuid)
RETURNS json AS $$
DECLARE
  query text;
  result json;
BEGIN
  query := format('SELECT * FROM %I WHERE id = %L', table_name, record_id);
  EXECUTE query INTO result;
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
`;
