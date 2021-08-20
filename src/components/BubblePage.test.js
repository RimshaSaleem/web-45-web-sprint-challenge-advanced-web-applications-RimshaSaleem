import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor} from "@testing-library/react";
import BubblePage from './BubblePage';

import mockFetchColorService from "../services/fetchColorService"
jest.mock("../services/fetchColorService")

test("Renders without errors", ()=> {
    mockFetchColorService.mockResolvedValueOnce({
        data: [
          {
            color: "aliceblue",
            code: {
              hex: "#f0f8ff",
            },
            id: 1,
          },
          {
            color: "limegreen",
            code: {
              hex: "#99ddbc",
            },
            id: 2,
          },
        ]
    });
      render(<BubblePage />)
       
  });
  
  test("Renders appropriate number of colors passed in through mock", async ()=> {
      //Keep in mind that our service is called on mount for this component.
      
      mockFetchColorService.mockResolvedValueOnce({
          data: [
            {
              color: "aliceblue",
              code: {
                hex: "#f0f8ff",
              },
              id: 1,
            },
            {
              color: "limegreen",
              code: {
                hex: "#99ddbc",
              },
              id: 2,
            },
          ]
      });
      render(<BubblePage />)
      
      await waitFor(() => {
    
        const limegreen = screen.getByText(/limegreen/i)
        const aliceblue = screen.getByText(/aliceblue/i)
        expect(limegreen).toBeInTheDocument()
        expect(aliceblue).toBeInTheDocument()
       
      })
      screen.debug()
  });