import type * as Http from 'node:http';
import type * as Stream from 'node:stream';

import { describe, expectTypeOf, it } from 'vitest';

import Wreck from '../src/index.js';


describe('typings', () => {

    describe('request()', () => {

        it('resolves an incoming message carrying the client request', () => {

            expectTypeOf(Wreck.request('get', 'http://localhost')).toEqualTypeOf<Promise<Http.IncomingMessage> & { req: Http.ClientRequest }>();
        });

        it('requires a method and a url', () => {

            // Asserted through expectTypeOf rather than a bare call — this file is also
            // collected as a runtime suite, and a bare Wreck.request() throws.

            // @ts-expect-error method and url are required
            expectTypeOf(Wreck.request).toBeCallableWith();
        });
    });

    describe('read()', () => {

        it('resolves a Buffer unless parameterized otherwise', () => {

            const stream = Wreck.toReadableStream('One two three');

            expectTypeOf(Wreck.read(stream)).toEqualTypeOf<Promise<Buffer>>();
            expectTypeOf(Wreck.read<{ foo: string }>(stream, { json: true })).toEqualTypeOf<Promise<{ foo: string }>>();
        });
    });

    describe('toReadableStream()', () => {

        it('returns a readable stream', () => {

            expectTypeOf(Wreck.toReadableStream('One two three')).toEqualTypeOf<Stream.Readable>();
            expectTypeOf(Wreck.toReadableStream([Buffer.from('One'), 'two'], 'ascii')).toEqualTypeOf<Stream.Readable>();
        });
    });

    describe('parseCacheControl()', () => {

        it('returns the parsed parameters or null', () => {

            expectTypeOf(Wreck.parseCacheControl('max-age=3600')).toExtend<{ 'max-age'?: number } | null>();
        });
    });

    describe('defaults()', () => {

        it('returns another client', () => {

            expectTypeOf(Wreck.defaults({ baseUrl: 'http://localhost' })).toEqualTypeOf<typeof Wreck>();
        });

        it('requires an options object', () => {

            // @ts-expect-error options are required
            expectTypeOf(Wreck.defaults).toBeCallableWith();
        });
    });

    describe('shortcuts', () => {

        it('resolve a response paired with the payload', () => {

            expectTypeOf(Wreck.get<string>('http://localhost')).toEqualTypeOf<Promise<{ res: Http.IncomingMessage; payload: string }>>();
            expectTypeOf(Wreck.post<string>('http://localhost')).toEqualTypeOf<Promise<{ res: Http.IncomingMessage; payload: string }>>();
            expectTypeOf(Wreck.patch<string>('http://localhost')).toEqualTypeOf<Promise<{ res: Http.IncomingMessage; payload: string }>>();
            expectTypeOf(Wreck.put<string>('http://localhost')).toEqualTypeOf<Promise<{ res: Http.IncomingMessage; payload: string }>>();
            expectTypeOf(Wreck.delete<string>('http://localhost')).toEqualTypeOf<Promise<{ res: Http.IncomingMessage; payload: string }>>();
        });
    });
});
