<?php
/**
 * Request Body Parser class
 *
 * LICENSE
 *
 * This source file is subject to the new BSD license that is bundled
 * with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://getfrapi.com/license/new-bsd
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@getfrapi.com so we can send you a copy immediately.
 *
 *
 * This class attempts to parse JSON or XML from the request body.
 *
 * @license   New BSD
 * @copyright echolibre ltd.
 * @package   frapi
 * @uses      Frapi_Error
 *
 */
class Frapi_Input_RequestBodyParser
{
    /**
     * extracts parameters from request body by parsing content
     * @return array|null decoded parameters
     */
    public static function parse($format, $body=null)
    {
        switch(strtolower($format))
        {
         case 'json':
            $jsonBody = json_decode($body, true);
            if(!is_null($jsonBody)) {
                return $jsonBody;
            }
            break;
         case 'xml':
            if(!empty($body)) {
                try {
                    $parsedXml = Frapi_Input_XmlParser::arrayFromXml($body);
                    return $parsedXml;
                } catch(Exception $e) {
                throw new Frapi_Error('INVALID_XML_BODY', $e->getMessage(), 400);
                }
            }
            break;
        default:
            break;
       }
    }
}