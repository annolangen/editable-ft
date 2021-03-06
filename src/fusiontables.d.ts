/**
 * Copied from npm module @types/gapi.client.fusiontables with correction for issue #3 https://github.com/Bolisov/google-api-typings-generator/issues/3.
 */

declare namespace gapi.client {
  /** Load Fusion Tables API v2 */
  function load(name:"fusiontables", version:"v2"):PromiseLike<void>;
  function load(name:"fusiontables", version:"v2", callback:() => any):void;
  /**
   * Loads the client library interface to a particular API. The new API interface will be in the form gapi.client.api.collection.method.
   * @param name The name of the API to load.
   * @param version The version of the API to load
   * @param callback the function that is called once the API interface is loaded
   */
  function load(name:string, version:string, callback:() => any):void;
  function load(name:string, version:string):PromiseLike<void>;

  /**
   * Creates a HTTP request for making RESTful requests.
   * An object encapsulating the various arguments for this method.
   */
  function request<T>(args:{
    /**
     * The URL to handle the request
     */
    path:string;
    /**
     * The HTTP request method to use. Default is GET
     */
    method?:string;
    /**
     * URL params in key-value pair form
     */
    params?:any;
    /**
     * Additional HTTP request headers
     */
    headers?:any;
    /**
     * The HTTP request body (applies to PUT or POST).
     */
    body?:any;
    // /**
    //  * If supplied, the request is executed immediately and no gapi.client.HttpRequest object is returned
    //  */
    // callback?: () => any;
  }):Request<T>;

  /**
   * Sets the API key for the application.
   * @param apiKey The API key to set
   */
  function setApiKey(apiKey:string):void;

  /**
   * An object containing information about the HTTP response
   */
  interface Response<T> {
    // The JSON-parsed result.
    result:T;

    // The raw response string.
    body:string;

    // The map of HTTP response headers.
    headers?:any[];

    // HTTP status
    status?:number;

    // HTTP status text
    statusText?:string;
  }

  /**
   * An object encapsulating an HTTP request. This object is not instantiated directly, rather it is returned by gapi.client.request.
   */
  interface Request<T> extends PromiseLike<Response<T>> {
    /**
     * Executes the request and runs the supplied callback on response.
     * @param callback The callback function which executes when the request succeeds or fails.
     */
    execute(callback:(/**
     * contains the response parsed as JSON. If the response is not JSON, this field will be false.
     */
        response:Response<T>) => any):void;
  }

  interface ResponseMap<T> {
    [id:string]:Response<T>;
  }

  /**
   * Represents an HTTP Batch operation. Individual HTTP requests are added with the add method and the batch is executed using execute.
   */
  interface Batch<T> extends PromiseLike<Response<ResponseMap<T>>> {
    /**
     * Adds a gapi.client.Request to the batch.
     * @param request The HTTP request to add to this batch.
     * @param opt_params extra parameters for this batch entry.
     */
    add<T>(request:Request<T>, opt_params?:{
      /**
       * Identifies the response for this request in the map of batch responses. If one is not provided, the system generates a random ID.
       */
      id:string;
      callback(/**
       * is the response for this request only. Its format is defined by the API method being called.
       */
          individualResponse:Response<T>, /**
           * is the raw batch ID-response map as a string. It contains all responses to all requests in the batch.
           */
          rawBatchResponse:string):any
    }):void;
    /**
     * Executes all requests in the batch. The supplied callback is executed on success or failure.
     * @param callback The callback to execute when the batch returns.
     */
    execute(callback:(/**
     * is an ID-response map of each requests response.
     */
        responseMap:ResponseMap<T>, /**
         * is the same response, but as an unparsed JSON-string.
         */
        rawBatchResponse:string) => any):void;
  }

  /**
   * Creates a batch object for batching individual requests.
   */
  function newBatch<T>():Batch<T>;

  namespace fusiontables {

    const column:fusiontables.ColumnResource;

    const query:fusiontables.QueryResource;

    const style:fusiontables.StyleResource;

    const table:fusiontables.TableResource;

    const task:fusiontables.TaskResource;

    const template:fusiontables.TemplateResource;

    interface Bucket {
      /** Color of line or the interior of a polygon in #RRGGBB format. */
      color?:string;
      /** Icon name used for a point. */
      icon?:string;
      /** Maximum value in the selected column for a row to be styled according to the bucket color, opacity, icon, or weight. */
      max?:number;
      /** Minimum value in the selected column for a row to be styled according to the bucket color, opacity, icon, or weight. */
      min?:number;
      /** Opacity of the color: 0.0 (transparent) to 1.0 (opaque). */
      opacity?:number;
      /** Width of a line (in pixels). */
      weight?:number;
    }
    interface Column {
      /** Identifier of the base column. If present, this column is derived from the specified base column. */
      baseColumn?:{
        /** The id of the column in the base table from which this column is derived. */
        columnId?:number;
        /** Offset to the entry in the list of base tables in the table definition. */
        tableIndex?:number;
      };
      /** Identifier for the column. */
      columnId?:number;
      /** JSON schema for interpreting JSON in this column. */
      columnJsonSchema?:string;
      /** JSON object containing custom column properties. */
      columnPropertiesJson?:string;
      /** Column description. */
      description?:string;
      /**
       * Format pattern.
       * Acceptable values are DT_DATE_MEDIUMe.g Dec 24, 2008 DT_DATE_SHORTfor example 12/24/08 DT_DATE_TIME_MEDIUMfor example Dec 24, 2008 8:30:45 PM
       * DT_DATE_TIME_SHORTfor example 12/24/08 8:30 PM DT_DAY_MONTH_2_DIGIT_YEARfor example 24/12/08 DT_DAY_MONTH_2_DIGIT_YEAR_TIMEfor example 24/12/08 20:30
       * DT_DAY_MONTH_2_DIGIT_YEAR_TIME_MERIDIANfor example 24/12/08 8:30 PM DT_DAY_MONTH_4_DIGIT_YEARfor example 24/12/2008 DT_DAY_MONTH_4_DIGIT_YEAR_TIMEfor
       * example 24/12/2008 20:30 DT_DAY_MONTH_4_DIGIT_YEAR_TIME_MERIDIANfor example 24/12/2008 8:30 PM DT_ISO_YEAR_MONTH_DAYfor example 2008-12-24
       * DT_ISO_YEAR_MONTH_DAY_TIMEfor example 2008-12-24 20:30:45 DT_MONTH_DAY_4_DIGIT_YEARfor example 12/24/2008 DT_TIME_LONGfor example 8:30:45 PM UTC-6
       * DT_TIME_MEDIUMfor example 8:30:45 PM DT_TIME_SHORTfor example 8:30 PM DT_YEAR_ONLYfor example 2008 HIGHLIGHT_UNTYPED_CELLSHighlight cell data that does
       * not match the data type NONENo formatting (default) NUMBER_CURRENCYfor example $1234.56 NUMBER_DEFAULTfor example 1,234.56 NUMBER_INTEGERfor example
       * 1235 NUMBER_NO_SEPARATORfor example 1234.56 NUMBER_PERCENTfor example 123,456% NUMBER_SCIENTIFICfor example 1E3 STRING_EIGHT_LINE_IMAGEDisplays
       * thumbnail images as tall as eight lines of text STRING_FOUR_LINE_IMAGEDisplays thumbnail images as tall as four lines of text STRING_JSON_TEXTAllows
       * editing of text as JSON in UI STRING_JSON_LISTAllows editing of text as a JSON list in UI STRING_LINKTreats cell as a link (must start with http:// or
       * https://) STRING_ONE_LINE_IMAGEDisplays thumbnail images as tall as one line of text STRING_VIDEO_OR_MAPDisplay a video or map thumbnail
       */
      formatPattern?:string;
      /**
       * Column graph predicate.
       * Used to map table to graph data model (subject,predicate,object)
       * See W3C Graph-based Data Model.
       */
      graphPredicate?:string;
      /** The kind of item this is. For a column, this is always fusiontables#column. */
      kind?:string;
      /** Name of the column. */
      name?:string;
      /** Type of the column. */
          type?:string;
      /** List of valid values used to validate data and supply a drop-down list of values in the web application. */
      validValues?:string[];
      /** If true, data entered via the web application is validated. */
      validateData?:boolean;
    }
    interface ColumnList {
      /** List of all requested columns. */
      items?:Column[];
      /** The kind of item this is. For a column list, this is always fusiontables#columnList. */
      kind?:string;
      /** Token used to access the next page of this result. No token is displayed if there are no more pages left. */
      nextPageToken?:string;
      /** Total number of columns for the table. */
      totalItems?:number;
    }
    interface Geometry {
      /** The list of geometries in this geometry collection. */
      geometries?:any[];
      geometry?:any;
      /** Type: A collection of geometries. */
          type?:string;
    }
    interface Import {
      /** The kind of item this is. For an import, this is always fusiontables#import. */
      kind?:string;
      /** The number of rows received from the import request. */
      numRowsReceived?:string;
    }
    interface Line {
      /** The coordinates that define the line. */
      coordinates?:number[][];
      /** Type: A line geometry. */
          type?:string;
    }
    interface LineStyle {
      /** Color of the line in #RRGGBB format. */
      strokeColor?:string;
      /** Column-value, gradient or buckets styler that is used to determine the line color and opacity. */
      strokeColorStyler?:StyleFunction;
      /** Opacity of the line : 0.0 (transparent) to 1.0 (opaque). */
      strokeOpacity?:number;
      /** Width of the line in pixels. */
      strokeWeight?:number;
      /** Column-value or bucket styler that is used to determine the width of the line. */
      strokeWeightStyler?:StyleFunction;
    }
    interface Point {
      /** The coordinates that define the point. */
      coordinates?:number[];
      /** Point: A point geometry. */
          type?:string;
    }
    interface PointStyle {
      /** Name of the icon. Use values defined in http://www.google.com/fusiontables/DataSource?dsrcid=308519 */
      iconName?:string;
      /** Column or a bucket value from which the icon name is to be determined. */
      iconStyler?:StyleFunction;
    }
    interface Polygon {
      /** The coordinates that define the polygon. */
      coordinates?:number[][][];
      /** Type: A polygon geometry. */
          type?:string;
    }
    interface PolygonStyle {
      /** Color of the interior of the polygon in #RRGGBB format. */
      fillColor?:string;
      /** Column-value, gradient, or bucket styler that is used to determine the interior color and opacity of the polygon. */
      fillColorStyler?:StyleFunction;
      /** Opacity of the interior of the polygon: 0.0 (transparent) to 1.0 (opaque). */
      fillOpacity?:number;
      /** Color of the polygon border in #RRGGBB format. */
      strokeColor?:string;
      /** Column-value, gradient or buckets styler that is used to determine the border color and opacity. */
      strokeColorStyler?:StyleFunction;
      /** Opacity of the polygon border: 0.0 (transparent) to 1.0 (opaque). */
      strokeOpacity?:number;
      /** Width of the polyon border in pixels. */
      strokeWeight?:number;
      /** Column-value or bucket styler that is used to determine the width of the polygon border. */
      strokeWeightStyler?:StyleFunction;
    }
    interface Sqlresponse {
      /** Columns in the table. */
      columns?:string[];
      /** The kind of item this is. For responses to SQL queries, this is always fusiontables#sqlresponse. */
      kind?:string;
      /**
       * The rows in the table. For each cell we print out whatever cell value (e.g., numeric, string) exists. Thus it is important that each cell contains only
       * one value.
       */
      rows?:any[][];
    }
    interface StyleFunction {
      /** Bucket function that assigns a style based on the range a column value falls into. */
      buckets?:Bucket[];
      /** Name of the column whose value is used in the style. */
      columnName?:string;
      /** Gradient function that interpolates a range of colors based on column value. */
      gradient?:{
        /** Array with two or more colors. */
        colors?:Array<{
          /** Color in #RRGGBB format. */
          color?:string;
          /** Opacity of the color: 0.0 (transparent) to 1.0 (opaque). */
          opacity?:number;
        }>;
        /** Higher-end of the interpolation range: rows with this value will be assigned to colors[n-1]. */
        max?:number;
        /** Lower-end of the interpolation range: rows with this value will be assigned to colors[0]. */
        min?:number;
      };
      /**
       * Stylers can be one of three kinds: "fusiontables#fromColumn if the column value is to be used as is, i.e., the column values can have colors in
       * #RRGGBBAA format or integer line widths or icon names; fusiontables#gradient if the styling of the row is to be based on applying the gradient function
       * on the column value; or fusiontables#buckets if the styling is to based on the bucket into which the the column value falls.
       */
      kind?:string;
    }
    interface StyleSetting {
      /**
       * The kind of item this is. A StyleSetting contains the style definitions for points, lines, and polygons in a table. Since a table can have any one or
       * all of them, a style definition can have point, line and polygon style definitions.
       */
      kind?:string;
      /** Style definition for points in the table. */
      markerOptions?:PointStyle;
      /** Optional name for the style setting. */
      name?:string;
      /** Style definition for polygons in the table. */
      polygonOptions?:PolygonStyle;
      /** Style definition for lines in the table. */
      polylineOptions?:LineStyle;
      /** Identifier for the style setting (unique only within tables). */
      styleId?:number;
      /** Identifier for the table. */
      tableId?:string;
    }
    interface StyleSettingList {
      /** All requested style settings. */
      items?:StyleSetting[];
      /** The kind of item this is. For a style list, this is always fusiontables#styleSettingList . */
      kind?:string;
      /** Token used to access the next page of this result. No token is displayed if there are no more styles left. */
      nextPageToken?:string;
      /** Total number of styles for the table. */
      totalItems?:number;
    }
    interface Table {
      /** Attribution assigned to the table. */
      attribution?:string;
      /** Optional link for attribution. */
      attributionLink?:string;
      /** Base table identifier if this table is a view or merged table. */
      baseTableIds?:string[];
      /** Default JSON schema for validating all JSON column properties. */
      columnPropertiesJsonSchema?:string;
      /** Columns in the table. */
      columns?:Column[];
      /** Description assigned to the table. */
      description?:string;
      /** Variable for whether table is exportable. */
      isExportable?:boolean;
      /** The kind of item this is. For a table, this is always fusiontables#table. */
      kind?:string;
      /** Name assigned to a table. */
      name?:string;
      /** SQL that encodes the table definition for derived tables. */
      sql?:string;
      /** Encrypted unique alphanumeric identifier for the table. */
      tableId?:string;
      /** JSON object containing custom table properties. */
      tablePropertiesJson?:string;
      /** JSON schema for validating the JSON table properties. */
      tablePropertiesJsonSchema?:string;
    }
    interface TableList {
      /** List of all requested tables. */
      items?:Table[];
      /** The kind of item this is. For table list, this is always fusiontables#tableList. */
      kind?:string;
      /** Token used to access the next page of this result. No token is displayed if there are no more pages left. */
      nextPageToken?:string;
    }
    interface Task {
      /** Type of the resource. This is always "fusiontables#task". */
      kind?:string;
      /** Task percentage completion. */
      progress?:string;
      /** false while the table is busy with some other task. true if this background task is currently running. */
      started?:boolean;
      /** Identifier for the task. */
      taskId?:string;
      /** Type of background task. */
          type?:string;
    }
    interface TaskList {
      /** List of all requested tasks. */
      items?:Task[];
      /** Type of the resource. This is always "fusiontables#taskList". */
      kind?:string;
      /** Token used to access the next page of this result. No token is displayed if there are no more pages left. */
      nextPageToken?:string;
      /** Total number of tasks for the table. */
      totalItems?:number;
    }
    interface Template {
      /** List of columns from which the template is to be automatically constructed. Only one of body or automaticColumns can be specified. */
      automaticColumnNames?:string[];
      /**
       * Body of the template. It contains HTML with {column_name} to insert values from a particular column. The body is sanitized to remove certain tags,
       * e.g., script. Only one of body or automaticColumns can be specified.
       */
      body?:string;
      /** The kind of item this is. For a template, this is always fusiontables#template. */
      kind?:string;
      /** Optional name assigned to a template. */
      name?:string;
      /** Identifier for the table for which the template is defined. */
      tableId?:string;
      /** Identifier for the template, unique within the context of a particular table. */
      templateId?:number;
    }
    interface TemplateList {
      /** List of all requested templates. */
      items?:Template[];
      /** The kind of item this is. For a template list, this is always fusiontables#templateList . */
      kind?:string;
      /** Token used to access the next page of this result. No token is displayed if there are no more pages left. */
      nextPageToken?:string;
      /** Total number of templates for the table. */
      totalItems?:number;
    }
    interface ColumnResource {
      /** Deletes the specified column. */
      delete(request:{
        /** Data format for the response. */
        alt?:string;
        /** Name or identifier for the column being deleted. */
        columnId:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Table from which the column is being deleted. */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<void>;
      /** Retrieves a specific column by its ID. */
      get(request:{
        /** Data format for the response. */
        alt?:string;
        /** Name or identifier for the column that is being requested. */
        columnId:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Table to which the column belongs. */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<Column>;
      /** Adds a new column to the table. */
      insert(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Table for which a new column is being added. */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<Column>;
      /** Retrieves a list of columns. */
      list(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** Maximum number of columns to return. Default is 5. */
        maxResults?:number;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Continuation token specifying which result page to return. */
        pageToken?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Table whose columns are being listed. */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<ColumnList>;
      /** Updates the name or type of an existing column. This method supports patch semantics. */
      patch(request:{
        /** Data format for the response. */
        alt?:string;
        /** Name or identifier for the column that is being updated. */
        columnId:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Table for which the column is being updated. */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<Column>;
      /** Updates the name or type of an existing column. */
      update(request:{
        /** Data format for the response. */
        alt?:string;
        /** Name or identifier for the column that is being updated. */
        columnId:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Table for which the column is being updated. */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<Column>;
    }
    interface QueryResource {
      /**
       * Executes a Fusion Tables SQL statement, which can be any of
       * - SELECT
       * - INSERT
       * - UPDATE
       * - DELETE
       * - SHOW
       * - DESCRIBE
       * - CREATE statement.
       */
      sql(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** Whether column names are included in the first row. Default is true. */
        hdrs?:boolean;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /**
         * A Fusion Tables SQL statement, which can be any of
         * - SELECT
         * - INSERT
         * - UPDATE
         * - DELETE
         * - SHOW
         * - DESCRIBE
         * - CREATE
         */
        sql:string;
        /** Whether typed values are returned in the (JSON) response: numbers for numeric values and parsed geometries for KML values. Default is true. */
        typed?:boolean;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<Sqlresponse>;
      /**
       * Executes a SQL statement which can be any of
       * - SELECT
       * - SHOW
       * - DESCRIBE
       */
      sqlGet(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** Whether column names are included (in the first row). Default is true. */
        hdrs?:boolean;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /**
         * A SQL statement which can be any of
         * - SELECT
         * - SHOW
         * - DESCRIBE
         */
        sql:string;
        /** Whether typed values are returned in the (JSON) response: numbers for numeric values and parsed geometries for KML values. Default is true. */
        typed?:boolean;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<Sqlresponse>;
    }
    interface StyleResource {
      /** Deletes a style. */
      delete(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Identifier (within a table) for the style being deleted */
        styleId:number;
        /** Table from which the style is being deleted */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<void>;
      /** Gets a specific style. */
      get(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Identifier (integer) for a specific style in a table */
        styleId:number;
        /** Table to which the requested style belongs */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<StyleSetting>;
      /** Adds a new style for the table. */
      insert(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Table for which a new style is being added */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<StyleSetting>;
      /** Retrieves a list of styles. */
      list(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** Maximum number of styles to return. Optional. Default is 5. */
        maxResults?:number;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Continuation token specifying which result page to return. Optional. */
        pageToken?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Table whose styles are being listed */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<StyleSettingList>;
      /** Updates an existing style. This method supports patch semantics. */
      patch(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Identifier (within a table) for the style being updated. */
        styleId:number;
        /** Table whose style is being updated. */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<StyleSetting>;
      /** Updates an existing style. */
      update(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Identifier (within a table) for the style being updated. */
        styleId:number;
        /** Table whose style is being updated. */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<StyleSetting>;
    }
    interface TableResource {
      /** Copies a table. */
      copy(request:{
        /** Data format for the response. */
        alt?:string;
        /** Whether to also copy tabs, styles, and templates. Default is false. */
        copyPresentation?:boolean;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** ID of the table that is being copied. */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<Table>;
      /** Deletes a table. */
      delete(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** ID of the table to be deleted. */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<void>;
      /** Retrieves a specific table by its ID. */
      get(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Identifier for the table being requested. */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<Table>;
      /** Imports more rows into a table. */
      importRows(request:{
        /** Data format for the response. */
        alt?:string;
        /** The delimiter used to separate cell values. This can only consist of a single character. Default is ,. */
        delimiter?:string;
        /** The encoding of the content. Default is UTF-8. Use auto-detect if you are unsure of the encoding. */
        encoding?:string;
        /**
         * The index of the line up to which data will be imported. Default is to import the entire file. If endLine is negative, it is an offset from the end of
         * the file; the imported content will exclude the last endLine lines.
         */
        endLine?:number;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /**
         * Whether the imported CSV must have the same number of values for each row. If false, rows with fewer values will be padded with empty values. Default
         * is true.
         */
        isStrict?:boolean;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** The index of the first line from which to start importing, inclusive. Default is 0. */
        startLine?:number;
        /** The table into which new rows are being imported. */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<Import>;
      /** Imports a new table. */
      importTable(request:{
        /** Data format for the response. */
        alt?:string;
        /** The delimiter used to separate cell values. This can only consist of a single character. Default is ,. */
        delimiter?:string;
        /** The encoding of the content. Default is UTF-8. Use auto-detect if you are unsure of the encoding. */
        encoding?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** The name to be assigned to the new table. */
        name:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<Table>;
      /** Creates a new table. */
      insert(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<Table>;
      /** Retrieves a list of tables a user owns. */
      list(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** Maximum number of tables to return. Default is 5. */
        maxResults?:number;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Continuation token specifying which result page to return. */
        pageToken?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<TableList>;
      /**
       * Updates an existing table. Unless explicitly requested, only the name, description, and attribution will be updated. This method supports patch
       * semantics.
       */
      patch(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Whether the view definition is also updated. The specified view definition replaces the existing one. Only a view can be updated with a new definition. */
        replaceViewDefinition?:boolean;
        /** ID of the table that is being updated. */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<Table>;
      /** Replaces rows of an existing table. Current rows remain visible until all replacement rows are ready. */
      replaceRows(request:{
        /** Data format for the response. */
        alt?:string;
        /** The delimiter used to separate cell values. This can only consist of a single character. Default is ,. */
        delimiter?:string;
        /** The encoding of the content. Default is UTF-8. Use 'auto-detect' if you are unsure of the encoding. */
        encoding?:string;
        /**
         * The index of the line up to which data will be imported. Default is to import the entire file. If endLine is negative, it is an offset from the end of
         * the file; the imported content will exclude the last endLine lines.
         */
        endLine?:number;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /**
         * Whether the imported CSV must have the same number of column values for each row. If true, throws an exception if the CSV does not have the same number
         * of columns. If false, rows with fewer column values will be padded with empty values. Default is true.
         */
        isStrict?:boolean;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** The index of the first line from which to start importing, inclusive. Default is 0. */
        startLine?:number;
        /** Table whose rows will be replaced. */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<Task>;
      /** Updates an existing table. Unless explicitly requested, only the name, description, and attribution will be updated. */
      update(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Whether the view definition is also updated. The specified view definition replaces the existing one. Only a view can be updated with a new definition. */
        replaceViewDefinition?:boolean;
        /** ID of the table that is being updated. */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<Table>;
    }
    interface TaskResource {
      /** Deletes a specific task by its ID, unless that task has already started running. */
      delete(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Table from which the task is being deleted. */
        tableId:string;
        /** The identifier of the task to delete. */
        taskId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<void>;
      /** Retrieves a specific task by its ID. */
      get(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Table to which the task belongs. */
        tableId:string;
        /** The identifier of the task to get. */
        taskId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<Task>;
      /** Retrieves a list of tasks. */
      list(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** Maximum number of tasks to return. Default is 5. */
        maxResults?:number;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Continuation token specifying which result page to return. */
        pageToken?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Index of the first result returned in the current page. */
        startIndex?:number;
        /** Table whose tasks are being listed. */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<TaskList>;
    }
    interface TemplateResource {
      /** Deletes a template */
      delete(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Table from which the template is being deleted */
        tableId:string;
        /** Identifier for the template which is being deleted */
        templateId:number;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<void>;
      /** Retrieves a specific template by its id */
      get(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Table to which the template belongs */
        tableId:string;
        /** Identifier for the template that is being requested */
        templateId:number;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<Template>;
      /** Creates a new template for the table. */
      insert(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Table for which a new template is being created */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<Template>;
      /** Retrieves a list of templates. */
      list(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** Maximum number of templates to return. Optional. Default is 5. */
        maxResults?:number;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Continuation token specifying which results page to return. Optional. */
        pageToken?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Identifier for the table whose templates are being requested */
        tableId:string;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<TemplateList>;
      /** Updates an existing template. This method supports patch semantics. */
      patch(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Table to which the updated template belongs */
        tableId:string;
        /** Identifier for the template that is being updated */
        templateId:number;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<Template>;
      /** Updates an existing template */
      update(request:{
        /** Data format for the response. */
        alt?:string;
        /** Selector specifying which fields to include in a partial response. */
        fields?:string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?:string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?:string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?:boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         * Overrides userIp if both are provided.
         */
        quotaUser?:string;
        /** Table to which the updated template belongs */
        tableId:string;
        /** Identifier for the template that is being updated */
        templateId:number;
        /** IP address of the site where the request originates. Use this if you want to enforce per-user limits. */
        userIp?:string;
      }):Request<Template>;
    }
  }
}
