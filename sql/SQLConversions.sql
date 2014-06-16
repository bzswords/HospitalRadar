/** In order to do joins, all Provider Number columns need to be converted from ntext to nvarvhar.
    Also, leading and trailing single quotes must be removed for perfect matches. The statements
    below can be used for these tasks, just replace the table and column names with whatever is
    appropriate for the use case. **/

/** Change ntext to nvarchar **/
ALTER TABLE [HospitalSQL].[dbo].[dbo_vwHQI_HOSP_GEOCODES] ALTER COLUMN [Provider Number] NVARCHAR(MAX);

/** Remove leading and trailing single quotes **/
UPDATE [HospitalSQL].[dbo].[dbo_vwHQI_HOSP]
SET [Provider Number] = SUBSTRING([Provider Number], 2, LEN([Provider Number]))
WHERE LEFT([Provider Number], 1) = ''''

UPDATE [HospitalSQL].[dbo].[dbo_vwHQI_HOSP]
SET [Provider Number] = SUBSTRING([Provider Number], 1, LEN([Provider Number])-1)
WHERE RIGHT([Provider Number], 1) = ''''