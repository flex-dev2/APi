import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";
import * as cheerio from "cheerio";
import FormData from "form-data";

export async function registerRoutes(app: Express): Promise<Server> {
  // YouTube Download API - based on the provided code
  app.get('/api/download/YouTube', async (req, res) => {
    const startTime = Date.now();
    
    try {
      const videoUrl = req.query.url as string;
      
      if (!videoUrl) {
        const responseTime = Date.now() - startTime;
        
        // Log the request
        await storage.logApiRequest({
          endpoint: '/api/download/YouTube',
          method: 'GET',
          parameters: JSON.stringify(req.query),
          response: JSON.stringify({ creator: 'Flex-dev', message: 'please put a youtube link' }),
          statusCode: 400,
          responseTime
        });
        
        return res.status(400).json({ 
          creator: 'Flex-dev',
          message: 'please put a youtube link' 
        });
      }

      const response = await axios.post(
        'https://www.clipto.com/api/youtube',
        { url: videoUrl },
        {
          headers: {
            'accept-language': 'en-US,en;q=0.9',
            'origin': 'https://www.clipto.com',
            'priority': 'u=1, i',
            'referer': 'https://www.clipto.com/ar/media-downloader/youtube-downloader',
            'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
            'cookie': 'NEXT_LOCALE=ar; uu=0a21ad6062a24a7f8404a39d47ed09bd; bucket=67; stripe-checkout=default; country=EG; ip=197.38.82.103; mac-download=default; show-mac-download-new-interface=default_second; _ga=GA1.1.793163608.1749281318; _gcl_au=1.1.823847378.1749281318; _clck=1ily4gt|2|fwk|0|1984; _uetsid=07c19b00437111f09c46b337ba3dae1e; _uetvid=07c1ac80437111f08293b30d16b943fd; _clsk=1eg416m|1749281353861|2|0|k.clarity.ms/collect; _ga_ZVDHSR45N6=GS2.1.s1749281318$o1$g1$t1749281361$j17$l0$h0; XSRF-TOKEN=oYxxJINt-8DG9N12SP6MFS3KVH1ADSVWGs9w'
          }
        }
      );

      const responseTime = Date.now() - startTime;
      const responseData = {
        creator: 'flex-dev',
        data: response.data
      };

      // Log the successful request
      await storage.logApiRequest({
        endpoint: '/api/download/YouTube',
        method: 'GET',
        parameters: JSON.stringify(req.query),
        response: JSON.stringify(responseData),
        statusCode: 200,
        responseTime
      });

      res.json(responseData);
    } catch (error) {
      console.error('Error:', error);
      
      const responseTime = Date.now() - startTime;
      const errorResponse = { error: 'حدث خطأ أثناء معالجة طلبك' };
      
      // Log the error
      await storage.logApiRequest({
        endpoint: '/api/download/YouTube',
        method: 'GET',
        parameters: JSON.stringify(req.query),
        response: JSON.stringify(errorResponse),
        statusCode: 500,
        responseTime
      });
      
      res.status(500).json(errorResponse);
    }
  });

  // TikTok Download API
  app.get('/api/download/tiktok', async (req, res) => {
    const startTime = Date.now();
    
    try {
      const url = req.query.url as string;
      
      if (!url) {
        const responseTime = Date.now() - startTime;
        const errorResponse = { creator: 'Flex-Dev', message: 'Please put Url' };
        
        await storage.logApiRequest({
          endpoint: '/api/download/tiktok',
          method: 'GET',
          parameters: JSON.stringify(req.query),
          response: JSON.stringify(errorResponse),
          statusCode: 400,
          responseTime
        });
        
        return res.status(400).json(errorResponse);
      }

      const response = await axios.post(
        'https://ssstik.io/abc',
        new URLSearchParams({
          'id': url,
          'locale': 'en',
          'tt': 'UlQ0aFI4'
        }),
        {
          params: { 'url': 'dl' },
          headers: {
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'hx-current-url': 'https://ssstik.io/',
            'hx-request': 'true',
            'hx-target': 'target',
            'hx-trigger': '_gcaptcha_pt',
            'origin': 'https://ssstik.io',
            'priority': 'u=1, i',
            'referer': 'https://ssstik.io/',
            'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36'
          }
        }
      );

      const $ = cheerio.load(response.data);
      const downloadLinks = {
        withoutWatermark: $('a.download_link.without_watermark').attr('href'),
        withoutWatermarkHD: $('a.download_link.without_watermark_hd').attr('href'),
        mp3: $('a.download_link.music').attr('href'),
        author: {
          name: $('h2').text(),
          avatar: $('img.result_author').attr('src')
        },
        stats: {
          likes: $('#trending-actions > div:nth-child(1) > div:nth-child(2)').text().trim(),
          comments: $('#trending-actions > div:nth-child(2) > div:nth-child(2)').text().trim(),
          shares: $('#trending-actions > div:nth-child(3) > div:nth-child(2)').text().trim()
        }
      };

      const responseTime = Date.now() - startTime;
      const responseData = { creator: 'Flex-Dev', result: downloadLinks };

      await storage.logApiRequest({
        endpoint: '/api/download/tiktok',
        method: 'GET',
        parameters: JSON.stringify(req.query),
        response: JSON.stringify(responseData),
        statusCode: 200,
        responseTime
      });

      res.json(responseData);
    } catch (error) {
      console.error('TikTok API Error:', error);
      
      const responseTime = Date.now() - startTime;
      const errorResponse = { creator: 'Flex-dev', message: 'An error occurred while processing your request' };
      
      await storage.logApiRequest({
        endpoint: '/api/download/tiktok',
        method: 'GET',
        parameters: JSON.stringify(req.query),
        response: JSON.stringify(errorResponse),
        statusCode: 500,
        responseTime
      });
      
      res.status(500).json(errorResponse);
    }
  });

  // DeepAI Chat API
  app.get('/api/ai/deepai', async (req, res) => {
    const startTime = Date.now();
    
    try {
      const text = req.query.text as string;
      
      if (!text) {
        const responseTime = Date.now() - startTime;
        const errorResponse = { creator: 'Flex-Dev', message: 'please put text' };
        
        await storage.logApiRequest({
          endpoint: '/api/ai/deepai',
          method: 'GET',
          parameters: JSON.stringify(req.query),
          response: JSON.stringify(errorResponse),
          statusCode: 400,
          responseTime
        });
        
        return res.status(400).json(errorResponse);
      }

      const form = new FormData();
      form.append('chat_style', 'chat');
      form.append('chatHistory', JSON.stringify([{"role":"user","content":text}]));
      form.append('model', 'standard');
      form.append('hacker_is_stinky', 'very_stinky');
      
      const response = await axios.post(
        'https://api.deepai.org/hacking_is_a_serious_crime',
        form,
        {
          headers: {
            ...form.getHeaders(),
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'api-key': 'tryit-80552042560-461efd5259bbb030bd9343f0dd123401',
            'origin': 'https://deepai.org',
            'priority': 'u=1, i',
            'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36'
          }
        }
      );

      const responseTime = Date.now() - startTime;
      const responseData = { creator: 'Flex-Dev', message: response.data };

      await storage.logApiRequest({
        endpoint: '/api/ai/deepai',
        method: 'GET',
        parameters: JSON.stringify(req.query),
        response: JSON.stringify(responseData),
        statusCode: 200,
        responseTime
      });

      res.json(responseData);
    } catch (error) {
      console.error('DeepAI API Error:', error);
      
      const responseTime = Date.now() - startTime;
      const errorResponse = { 
        creator: 'Flex-Dev',
        error: 'حدث خطأ أثناء معالجة طلبك',
        details: error instanceof Error ? error.message : 'Unknown error'
      };
      
      await storage.logApiRequest({
        endpoint: '/api/ai/deepai',
        method: 'GET',
        parameters: JSON.stringify(req.query),
        response: JSON.stringify(errorResponse),
        statusCode: 500,
        responseTime
      });
      
      res.status(500).json(errorResponse);
    }
  });

  // BlackBox AI Chat API
  app.get('/api/ai/blackbox', async (req, res) => {
    const startTime = Date.now();
    
    try {
      const text = req.query.text as string;
      
      if (!text) {
        const responseTime = Date.now() - startTime;
        const errorResponse = { creator: 'Flex-dev', message: 'please put a text' };
        
        await storage.logApiRequest({
          endpoint: '/api/ai/blackbox',
          method: 'GET',
          parameters: JSON.stringify(req.query),
          response: JSON.stringify(errorResponse),
          statusCode: 400,
          responseTime
        });
        
        return res.status(400).json(errorResponse);
      }

      const response = await axios.post(
        'https://www.blackbox.ai/api/chat',
        {
          'messages': [
            {
              'id': '9rBWXwS',
              'content': text,
              'role': 'user'
            }
          ],
          'id': '9rBWXwS',
          'previewToken': null,
          'userId': null,
          'codeModelMode': true,
          'trendingAgentMode': {},
          'isMicMode': false,
          'userSystemPrompt': null,
          'maxTokens': 1024,
          'playgroundTopP': null,
          'playgroundTemperature': null,
          'isChromeExt': false,
          'githubToken': '',
          'clickedAnswer2': false,
          'clickedAnswer3': false,
          'clickedForceWebSearch': false,
          'visitFromDelta': false,
          'isMemoryEnabled': false,
          'mobileClient': false,
          'userSelectedModel': null,
          'validated': '00f37b34-a166-4efb-bce5-1312d87f2f94',
          'imageGenerationMode': false,
          'imageGenMode': 'autoMode',
          'webSearchModePrompt': false,
          'deepSearchMode': false,
          'domains': null,
          'vscodeClient': false,
          'codeInterpreterMode': false,
          'customProfile': {
            'name': '',
            'occupation': '',
            'traits': [],
            'additionalInfo': '',
            'enableNewChats': false
          },
          'webSearchModeOption': {
            'autoMode': true,
            'webMode': false,
            'offlineMode': false
          },
          'isPremium': false,
          'beastMode': false,
          'reasoningMode': false,
          'designerMode': false,
          'workspaceId': '',
          'asyncMode': false,
          'integrations': {},
          'isTaskPersistent': false,
          'selectedElement': null
        },
        {
          headers: {
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            'origin': 'https://www.blackbox.ai',
            'priority': 'u=1, i',
            'referer': 'https://www.blackbox.ai/',
            'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36'
          }
        }
      );

      const responseTime = Date.now() - startTime;
      const responseData = { creator: 'Flex-dev', message: response.data };

      await storage.logApiRequest({
        endpoint: '/api/ai/blackbox',
        method: 'GET',
        parameters: JSON.stringify(req.query),
        response: JSON.stringify(responseData),
        statusCode: 200,
        responseTime
      });

      res.json(responseData);
    } catch (error) {
      console.error('BlackBox AI API Error:', error);
      
      const responseTime = Date.now() - startTime;
      const errorResponse = { 
        creator: 'Flex-dev',
        error: 'حدث خطأ أثناء معالجة طلبك',
        details: error instanceof Error ? error.message : 'Unknown error'
      };
      
      await storage.logApiRequest({
        endpoint: '/api/ai/blackbox',
        method: 'GET',
        parameters: JSON.stringify(req.query),
        response: JSON.stringify(errorResponse),
        statusCode: 500,
        responseTime
      });
      
      res.status(500).json(errorResponse);
    }
  });

  // Facebook Download API
  app.get('/api/download/facebook', async (req, res) => {
    const startTime = Date.now();
    
    try {
      const url = req.query.url as string;
      
      if (!url) {
        const responseTime = Date.now() - startTime;
        const errorResponse = { creator: 'Flex-dev', message: 'pls put facebook url' };
        
        await storage.logApiRequest({
          endpoint: '/api/download/facebook',
          method: 'GET',
          parameters: JSON.stringify(req.query),
          response: JSON.stringify(errorResponse),
          statusCode: 400,
          responseTime
        });
        
        return res.status(400).json(errorResponse);
      }

      // Send POST request to Facebook downloader
      const response = await axios.post(
        'https://v3.fdownloader.net/api/ajaxSearch',
        new URLSearchParams({
          k_exp: '1751154806',
          k_token: '65414774a365b3671061bfe10e667029385b039d66e5781cd7109d3e4eb303c6',
          q: url,
          lang: 'ar',
          web: 'fdownloader.net',
          v: 'v2',
          w: '',
          cftoken: 'JWT.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjE5Ny4zOC44MS41OCIsInVybCI6Imh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZS9yLzE2cm1CUkxHbW4vIiwibmJmIjoxNzUxODA3OTYxLCJleHAiOjE3NTE4MDgyNjEsImlhdCI6MTc1MTgwNzk2MX0.oPuMpP0nvDixhLZ1nlv--yZ_RBWIl1UI5C5h5vTYo-Y',
        }),
        {
          headers: {
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9,ar;q=0.8',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'origin': 'https://fdownloader.net',
            'priority': 'u=1, i',
            'referer': 'https://fdownloader.net/',
            'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
          },
        }
      );

      // Check if response contains data
      const responseData = response.data;
      if (!responseData || !responseData.data) {
        throw new Error('No HTML data found in response');
      }

      // Load HTML from data field in response
      const $ = cheerio.load(responseData.data);

      // Remove unwanted elements
      $('div.ads-slot').remove();
      $('script').remove();

      // Initialize result object
      const result = {
        title: '',
        duration: '',
        thumbnail: undefined as string | undefined,
        downloadLinks: {} as Record<string, string>,
      };

      // Extract title
      result.title = $('h3').text().trim() || 'No title found';

      // Extract duration
      result.duration = $('p').first().text().trim() || 'No duration found';

      // Extract thumbnail
      result.thumbnail = $('img').attr('src') || undefined;

      // Extract download links from <a> tags
      $('a.download-link-fb').each((i, element) => {
        const quality = $(element).closest('tr').find('.video-quality').text().trim();
        const url = $(element).attr('href');
        if (quality && url) {
          result.downloadLinks[quality] = url;
        }
      });

      // Extract additional links from <button> tags
      $('button[data-videourl]').each((i, element) => {
        const quality = $(element).closest('tr').find('.video-quality').text().trim();
        const url = $(element).attr('data-videourl');
        if (quality && url) {
          result.downloadLinks[quality] = url;
        }
      });

      const responseTime = Date.now() - startTime;
      const responseDataObj = { creator: 'flex-dev', result: result };

      await storage.logApiRequest({
        endpoint: '/api/download/facebook',
        method: 'GET',
        parameters: JSON.stringify(req.query),
        response: JSON.stringify(responseDataObj),
        statusCode: 200,
        responseTime
      });

      res.json(responseDataObj);
    } catch (error) {
      console.error('Facebook API Error:', error);
      
      const responseTime = Date.now() - startTime;
      const errorResponse = { 
        creator: 'flex-dev',
        message: 'An error occurred while processing the request'
      };
      
      await storage.logApiRequest({
        endpoint: '/api/download/facebook',
        method: 'GET',
        parameters: JSON.stringify(req.query),
        response: JSON.stringify(errorResponse),
        statusCode: 500,
        responseTime
      });
      
      res.status(500).json(errorResponse);
    }
  });

  // Twitter/X Download API
  app.get('/api/download/twitter', async (req, res) => {
    const startTime = Date.now();
    
    try {
      const url = req.query.url as string;
      
      if (!url) {
        const responseTime = Date.now() - startTime;
        const errorResponse = { creator: 'Flex-dev', message: 'please provide a Twitter/X video URL' };
        
        await storage.logApiRequest({
          endpoint: '/api/download/twitter',
          method: 'GET',
          parameters: JSON.stringify(req.query),
          response: JSON.stringify(errorResponse),
          statusCode: 400,
          responseTime
        });
        
        return res.status(400).json(errorResponse);
      }

      // Send POST request to ssstwitter.com
      const response = await axios.post(
        'https://ssstwitter.com/',
        new URLSearchParams({
          'id': url,
          'locale': 'en',
          'tt': '56aa9afc4a4562a8f08213a09ddb7b85',
          'ts': '1751622801',
          'source': 'form'
        }),
        {
          headers: {
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9,ar;q=0.8',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'hx-current-url': 'https://ssstwitter.com/',
            'hx-request': 'true',
            'hx-target': 'target',
            'origin': 'https://ssstwitter.com',
            'priority': 'u=1, i',
            'referer': 'https://ssstwitter.com/',
            'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
            'cookie': '_ga=GA1.1.61770727.1751815611; _ga_RCQKEYPTD1=GS2.1.s1751815611$o1$g0$t1751815618$j53$l0$h0'
          }
        }
      );

      if (!response.data) {
        throw new Error('No HTML data found in response');
      }

      // Load HTML with Cheerio
      const $ = cheerio.load(response.data);

      // Remove unwanted elements
      $('div.ads-slot').remove();
      $('script').remove();

      // Initialize result object
      const result = {
        title: '',
        duration: '',
        thumbnail: undefined as string | undefined,
        downloadLinks: {} as Record<string, string>
      };

      // Extract title
      result.title = $('h2').text().trim() || $('meta[property="og:title"]').attr('content') || 'No title found';

      // Extract duration
      result.duration = $('meta[property="og:video:duration"]').attr('content') || 'No duration found';

      // Extract thumbnail
      const thumbnailUrl = $('meta[property="og:image"]').attr('content') || $('img').first().attr('src');
      result.thumbnail = thumbnailUrl || undefined;

      // Extract download links
      $('a.download_link.download-btn').each((i, element) => {
        const quality = $(element).find('span').text().trim().replace('Download', '').trim();
        const downloadUrl = $(element).attr('href') || $(element).attr('data-directurl');
        if (quality && downloadUrl) {
          result.downloadLinks[quality] = downloadUrl;
        }
      });

      const responseTime = Date.now() - startTime;
      const responseDataObj = { creator: 'Flex-dev', result };

      await storage.logApiRequest({
        endpoint: '/api/download/twitter',
        method: 'GET',
        parameters: JSON.stringify(req.query),
        response: JSON.stringify(responseDataObj),
        statusCode: 200,
        responseTime
      });

      res.json(responseDataObj);

    } catch (error) {
      console.error('Twitter Download Error:', error);
      
      const responseTime = Date.now() - startTime;
      const errorResponse = { 
        creator: 'Flex-dev',
        error: 'حدث خطأ أثناء معالجة طلبك'
      };
      
      await storage.logApiRequest({
        endpoint: '/api/download/twitter',
        method: 'GET',
        parameters: JSON.stringify(req.query),
        response: JSON.stringify(errorResponse),
        statusCode: 500,
        responseTime
      });
      
      res.status(500).json(errorResponse);
    }
  });

  // API Statistics endpoint
  app.get('/api/stats', async (req, res) => {
    try {
      const stats = await storage.getApiStats();
      res.json(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ error: 'Failed to fetch API statistics' });
    }
  });

  // API Usage History endpoint
  app.get('/api/usage', async (req, res) => {
    try {
      const usage = await storage.getApiUsage();
      res.json(usage);
    } catch (error) {
      console.error('Error fetching usage:', error);
      res.status(500).json({ error: 'Failed to fetch API usage' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
