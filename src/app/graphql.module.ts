import {NgModule} from '@angular/core';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Apollo, ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {split} from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

interface Definintion {
  kind: string;
  operation?: string;
}

const uri = 'http://localhost:3300/graphql'; // <-- add the URL of the GraphQL server here
const wsuri = 'ws://localhost:3300/graphql';
// export function createApollo(httpLink: HttpLink) {
//   return {
//     link: httpLink.create({uri}),
//     cache: new InMemoryCache(),
//   };
// }

@NgModule({
  exports: [ApolloModule, HttpLinkModule, HttpClientModule]
  // providers: [
  //   {
  //     provide: APOLLO_OPTIONS,
  //     useFactory: createApollo,
  //     deps: [HttpLink],
  //   },
  // ],
})
export class GraphQLModule {
  constructor(apollo: Apollo,
              httpLink: HttpLink) {
    const http = httpLink.create({
      uri
    });

    // Create a WebSocket link:
    const ws = new WebSocketLink({
      uri: wsuri,
      options: {
        reconnect: true
      }
    });

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation }: Definintion = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      ws,
      http,
    );

    apollo.create({
      link,
      cache: new InMemoryCache()
      // ... options
    });
  }
}
